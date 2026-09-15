class ApplicationController < ActionController::Base
  include Authentication

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  inertia_share auth: -> { { user: Current.user && user_props(Current.user) } },
                flash: -> { flash.to_hash.slice("notice", "alert") }

  private

  def user_props(user)
    {
      id: user.id.to_s,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatar_url
    }
  end

  def avatar_upload_error(upload)
    return if upload.blank?
    return "deve ter no máximo 5 MiB" if upload.size > User::MAX_AVATAR_SIZE

    upload.tempfile.rewind
    detected_type = Marcel::MimeType.for(upload.tempfile, declared_type: nil)
    upload.tempfile.rewind
    return if User::ALLOWED_AVATAR_TYPES.include?(detected_type)

    "deve ser um JPEG, PNG ou WebP válido"
  rescue IOError, SystemCallError
    "não pôde ser validado"
  end
end
