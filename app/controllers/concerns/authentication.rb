module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
  end

  class_methods do
    def allow_unauthenticated_access(**)
      skip_before_action(:require_authentication, **)
    end
  end

  private

  def require_authentication
    resume_session || redirect_to(sign_in_path)
  end

  def resume_session
    Current.session ||= Session.includes(:user).find_by(id: cookies.signed[:session_id]) if cookies.signed[:session_id]
  end

  def start_new_session_for(user)
    reset_session
    user.sessions.create!(user_agent: request.user_agent, ip_address: request.remote_ip).tap do |record|
      Current.session = record
      cookies.signed.permanent[:session_id] = { value: record.id, httponly: true, same_site: :lax }
    end
  end

  def terminate_session
    Current.session&.destroy!
    Current.session = nil
    reset_session
    cookies.delete(:session_id)
  end
end
