module Admin
  class UsersController < BaseController
    before_action :set_user, only: %i[show edit update destroy set_initial_password]

    def index
      users = User.order(:full_name, :id).map { |user| user_props(user).merge(permissions: permissions_for(user)) }
      render inertia: "Admin/Users/Index", props: { users: }
    end

    def show
      render_edit
    end

    def new
      render inertia: "Admin/Users/New", props: { roleOptions: role_options }
    end

    def edit
      render_edit
    end

    def create
      attributes = create_params
      user = new_user(attributes)
      if (upload_error = avatar_upload_error(attributes[:avatar]))
        return render_new(errors: { avatar: upload_error })
      end

      return redirect_to(admin_users_path, notice: t("notices.user_created")) if user.save

      render_new(errors: error_props(user))
    rescue ActiveRecord::RecordNotUnique
      render_new(errors: { email: "já está em uso" })
    end

    def update
      attributes, remove_avatar = admin_update
      return render_edit(errors: { avatar: "não pode ser enviado junto com remoção" }) if attributes.nil?

      upload_error = avatar_upload_error(attributes[:avatar])
      return render_edit(errors: { avatar: upload_error }) if upload_error

      result = LastAdminMutation.update(@user, attributes.to_h.symbolize_keys)
      return render_edit(errors: result.errors) if result.failure?

      finish_update(remove_avatar)
    rescue ActiveRecord::RecordNotUnique
      render_edit(errors: { email: "já está em uso" })
    end

    def destroy
      unless deletion_params[:confirmation].to_s.strip == "EXCLUIR"
        return render_edit(errors: { confirmation: "Digite EXCLUIR para confirmar." })
      end

      result = LastAdminMutation.destroy(@user)
      return render_edit(errors: { confirmation: result.error }) if result.failure?

      return finish_current_user_destroy if @user == Current.user

      redirect_to admin_users_path, notice: t("notices.user_deleted")
    end

    def set_initial_password
      result = InitialImportedPassword.call(user: @user, **initial_password_params.to_h.symbolize_keys)
      return redirect_to(edit_admin_user_path(@user), notice: t("notices.initial_password_set")) if result.success?

      render_edit(errors: { password: result.error })
    end

    private

    def set_user
      @user = User.find(params.expect(:id))
    end

    def create_params
      params.expect(admin_user: %i[full_name email role password password_confirmation avatar])
    end

    def new_user(attributes)
      User.new(attributes).tap { |user| user.password_required = true }
    end

    def admin_update
      permitted = params.expect(admin_user: %i[full_name email role avatar remove_avatar])
      remove_avatar = permitted.delete(:remove_avatar) == "1"
      return [nil, false] if remove_avatar && permitted[:avatar].present?

      [permitted, remove_avatar]
    end

    def deletion_params
      params.expect(deletion: [:confirmation])
    end

    def initial_password_params
      params.expect(initial_password: %i[password password_confirmation])
    end

    def render_edit(errors: {})
      render inertia: "Admin/Users/Edit", props: {
        user: user_props(@user), roleOptions: role_options, permissions: permissions_for(@user), errors:
      }, status: errors.empty? ? :ok : :unprocessable_content
    end

    def render_new(errors:)
      render inertia: "Admin/Users/New", props: { roleOptions: role_options, errors: },
             status: :unprocessable_content
    end

    def finish_update(remove_avatar)
      @user.avatar.purge if remove_avatar
      destination = @user == Current.user && @user.regular? ? profile_path : admin_users_path
      redirect_to destination, notice: t("notices.user_updated")
    end

    def finish_current_user_destroy
      Current.session = nil
      reset_session
      cookies.delete(:session_id)
      redirect_to sign_in_path, status: :see_other, notice: t("notices.account_deleted")
    end

    def role_options
      [{ value: "admin", label: "Administrador" }, { value: "regular", label: "Usuário regular" }]
    end

    def permissions_for(user)
      other_admin_exists = !user.admin? || User.admin.where.not(id: user.id).exists?
      { edit: true, destroy: other_admin_exists, changeRole: other_admin_exists }
    end
  end
end
