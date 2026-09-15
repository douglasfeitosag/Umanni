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
end
