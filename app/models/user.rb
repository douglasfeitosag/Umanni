class User < ApplicationRecord
  ROLES = { regular: "regular", admin: "admin" }.freeze
  MAX_PASSWORD_BYTES = 72
  MIN_PASSWORD_LENGTH = 12
  ALLOWED_AVATAR_TYPES = %w[image/jpeg image/png image/webp].freeze
  MAX_AVATAR_SIZE = 5.megabytes

  has_secure_password validations: false
  attr_accessor :password_required

  has_many :sessions, dependent: :destroy
  has_one_attached :avatar

  enum :role, ROLES, default: :regular, validate: true
  normalizes :email, with: ->(email) { email.strip.downcase }

  validates :full_name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: { case_sensitive: false }
  validates :password, confirmation: true, if: -> { password.present? }
  validates :password, presence: true, if: :password_required
  validates :password_confirmation, presence: true, if: :password_required
  validate :password_policy, if: -> { password.present? }
  validate :avatar_is_safe

  after_create_commit :invalidate_dashboard_metrics
  after_update_commit :handle_role_transition, if: :saved_change_to_role?
  after_destroy_commit :disconnect_and_invalidate

  def avatar_url
    return unless avatar.attached? && avatar.blob.persisted?

    Rails.application.routes.url_helpers.rails_blob_path(avatar.blob,
                                                         only_path: true)
  end

  private

  def password_policy
    return errors.add(:password, :too_short, count: MIN_PASSWORD_LENGTH) if password.length < MIN_PASSWORD_LENGTH
    return unless password.bytesize > MAX_PASSWORD_BYTES

    errors.add(:password, "deve ter no máximo 72 bytes")
  end

  def avatar_is_safe
    return unless avatar.attached?

    errors.add(:avatar, "deve ser JPEG, PNG ou WebP") unless ALLOWED_AVATAR_TYPES.include?(avatar.blob.content_type)
    errors.add(:avatar, "deve ter no máximo 5 MiB") if avatar.blob.byte_size > MAX_AVATAR_SIZE
  end

  def handle_role_transition
    disconnect_cable if role_before_last_save == "admin" && regular?
    invalidate_dashboard_metrics
  end

  def disconnect_and_invalidate
    disconnect_cable
    invalidate_dashboard_metrics
  end

  def disconnect_cable
    ActionCable.server.remote_connections.where(current_user: self).disconnect
  end

  def invalidate_dashboard_metrics
    ActionCable.server.broadcast("dashboard_metrics", { type: "dashboard.metrics.changed", schemaVersion: 1 })
  end
end
