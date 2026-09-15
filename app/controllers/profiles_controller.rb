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
    attributes, remove_avatar = profile_update
    return render_profile_edit(errors: { avatar: "não pode ser enviado junto com remoção" }) if attributes.nil?
    if (upload_error = avatar_upload_error(attributes[:avatar]))
      return render_profile_edit(errors: { avatar: upload_error })
    end

    return finish_update(remove_avatar) if Current.user.update(attributes)

    render_profile_edit(errors: error_props(Current.user))
  rescue ActiveRecord::RecordNotUnique
    render_profile_edit(errors: { email: "já está em uso" })
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

    finish_destroy
  end

  private

  def profile_destroy_allowed?
    !Current.user.admin? || User.where(role: :admin).where.not(id: Current.user.id).exists?
  end

  def profile_update
    permitted = params.expect(profile: %i[full_name email avatar remove_avatar])
    remove_avatar = permitted.delete(:remove_avatar) == "1"
    return [nil, false] if remove_avatar && permitted[:avatar].present?

    [permitted, remove_avatar]
  end

  def deletion_params
    params.expect(deletion: [:confirmation])
  end

  def render_last_admin_error(message)
    render inertia: "Profile/Show", props: {
      profile: user_props(Current.user), permissions: { edit: true, destroy: false }, errors: { confirmation: message }
    }, status: :unprocessable_content
  end

  def render_profile_edit(errors:)
    render inertia: "Profile/Edit", props: { profile: user_props(Current.user), errors: },
           status: :unprocessable_content
  end

  def finish_update(remove_avatar)
    Current.user.avatar.purge if remove_avatar
    redirect_to profile_path, notice: t("notices.profile_updated")
  end

  def finish_destroy
    Current.session = nil
    reset_session
    cookies.delete(:session_id)
    redirect_to sign_in_path, status: :see_other, notice: t("notices.account_deleted")
  end
end
