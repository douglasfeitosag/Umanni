class RegistrationsController < ApplicationController
  allow_unauthenticated_access

  def new
    render inertia: "Auth/SignUp"
  end

  def create
    user = User.new(registration_params)
    user.role = :regular
    user.password_required = true

    if user.save
      start_new_session_for(user)
      redirect_to profile_path, notice: "Cadastro realizado com sucesso."
    else
      render inertia: "Auth/SignUp", props: { errors: user.errors.to_hash }, status: :unprocessable_content
    end
  rescue ActiveRecord::RecordNotUnique
    render inertia: "Auth/SignUp", props: { errors: { email: ["já está em uso"] } }, status: :unprocessable_content
  end

  private

  def registration_params
    params.expect(registration: %i[full_name email password password_confirmation])
  end
end
