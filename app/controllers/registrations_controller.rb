class RegistrationsController < ApplicationController
  allow_unauthenticated_access

  def new
    render inertia: "Auth/SignUp"
  end

  def create
    user = User.new(registration_params.merge(role: :regular))
    user.password_required = true

    return finish_registration(user) if user.save

    render inertia: "Auth/SignUp", props: { errors: error_props(user) }, status: :unprocessable_content
  rescue ActiveRecord::RecordNotUnique
    render inertia: "Auth/SignUp", props: { errors: { email: "já está em uso" } }, status: :unprocessable_content
  end

  private

  def registration_params
    params.expect(registration: %i[full_name email password password_confirmation])
  end

  def finish_registration(user)
    start_new_session_for(user)
    redirect_to profile_path, notice: t("notices.registration_created")
  end
end
