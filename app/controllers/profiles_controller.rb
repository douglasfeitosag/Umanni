class ProfilesController < ApplicationController
  def show
    render inertia: "Profile/Show", props: {
      profile: user_props(Current.user),
      permissions: { edit: true, destroy: profile_destroy_allowed? }
    }
  end

  def edit
    render inertia: "Profile/Edit", props: { profile: user_props(Current.user) }
  end

  def update
    if Current.user.update(profile_params)
      redirect_to profile_path, notice: "Perfil atualizado."
    else
      render inertia: "Profile/Edit", props: { profile: user_props(Current.user), errors: Current.user.errors.to_hash }, status: :unprocessable_content
    end
  rescue ActiveRecord::RecordNotUnique
    render inertia: "Profile/Edit", props: { profile: user_props(Current.user), errors: { email: ["já está em uso"] } }, status: :unprocessable_content
  end

  def destroy
    unless deletion_params[:confirmation].to_s.strip == "EXCLUIR"
      return render inertia: "Profile/Show", props: {
        profile: user_props(Current.user), permissions: { edit: true, destroy: profile_destroy_allowed? },
        errors: { confirmation: "Digite EXCLUIR para confirmar." }
      }, status: :unprocessable_content
    end

    result = LastAdminMutation.destroy(Current.user)
    return render_last_admin_error(result.error) if result.failure?

    Current.session = nil
    reset_session
    cookies.delete(:session_id)
    redirect_to sign_in_path, status: :see_other, notice: "Conta excluída."
  end

  private

  def profile_destroy_allowed?
    !Current.user.admin? || User.where(role: :admin).where.not(id: Current.user.id).exists?
  end

  def profile_params
    params.expect(profile: %i[full_name email avatar remove_avatar]).tap do |permitted|
      permitted.delete(:avatar) if permitted[:remove_avatar] == "1"
      Current.user.avatar.purge if permitted.delete(:remove_avatar) == "1"
    end
  end

  def deletion_params
    params.expect(deletion: [:confirmation])
  end

  def render_last_admin_error(message)
    render inertia: "Profile/Show", props: {
      profile: user_props(Current.user), permissions: { edit: true, destroy: false }, errors: { confirmation: message }
    }, status: :unprocessable_content
  end
end
