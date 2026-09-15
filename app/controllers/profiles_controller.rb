class ProfilesController < ApplicationController
  def show
    render inertia: "Profile/Show", props: {
      profile: user_props(Current.user),
      permissions: { edit: true, destroy: profile_destroy_allowed? }
    }
  end

  private

  def profile_destroy_allowed?
    !Current.user.admin? || User.where(role: :admin).where.not(id: Current.user.id).exists?
  end
end
