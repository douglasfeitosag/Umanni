class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[new create]

  def new
    render inertia: "Auth/SignIn"
  end

  def create
    credentials = params.expect(session: %i[email password])
    email = credentials[:email].to_s.strip.downcase
    user = User.authenticate_by(email:, password: credentials[:password])

    if user
      start_new_session_for(user)
      redirect_to(user.admin? ? admin_dashboard_path : profile_path)
    else
      render inertia: "Auth/SignIn", props: { errors: { credentials: "E-mail ou senha inválidos." } },
             status: :unprocessable_content
    end
  end

  def destroy
    terminate_session
    redirect_to sign_in_path, status: :see_other, notice: t("notices.session_destroyed")
  end
end
