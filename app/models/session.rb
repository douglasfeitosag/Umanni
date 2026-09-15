class Session < ApplicationRecord
  belongs_to :user

  after_destroy_commit :disconnect_user

  private

  def disconnect_user
    ActionCable.server.remote_connections.where(current_user: user).disconnect
  end
end
