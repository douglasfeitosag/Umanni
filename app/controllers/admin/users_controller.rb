class Admin::UsersController < Admin::BaseController
  before_action :set_user, only: %i[show edit update destroy]

  def index
    users = User.order(:full_name, :id).map { |user| user_props(user).merge(permissions: permissions_for(user)) }
    render inertia: "Admin/Users/Index", props: { users: }
  end

  def new
    render inertia: "Admin/Users/New", props: { roleOptions: role_options }
  end

  def show
    render_edit
  end

  def edit
    render_edit
  end

  def create
    user = User.new(create_params)
    if (upload_error = avatar_upload_error(create_params[:avatar]))
      return render inertia: "Admin/Users/New", props: { roleOptions: role_options, errors: { avatar: upload_error } }, status: :unprocessable_content
    end
    user.password_required = true
    if user.save
      redirect_to admin_users_path, notice: "Usuário criado."
    else
      render inertia: "Admin/Users/New", props: { roleOptions: role_options, errors: user.errors.to_hash }, status: :unprocessable_content
    end
  rescue ActiveRecord::RecordNotUnique
    render inertia: "Admin/Users/New", props: { roleOptions: role_options, errors: { email: ["já está em uso"] } }, status: :unprocessable_content
  end

  def update
    attributes, remove_avatar = admin_update
    return render_edit(errors: { avatar: "não pode ser enviado junto com remoção" }) if attributes.nil?
    return render_edit(errors: { avatar: avatar_upload_error(attributes[:avatar]) }) if avatar_upload_error(attributes[:avatar])

    result = LastAdminMutation.update(@user, attributes.to_h.symbolize_keys)
    @user.avatar.purge if result.success? && remove_avatar
    return redirect_to(admin_users_path, notice: "Usuário atualizado.") if result.success?

    render_edit(errors: { role: result.error })
  rescue ActiveRecord::RecordNotUnique
    render_edit(errors: { email: ["já está em uso"] })
  end

  def destroy
    unless deletion_params[:confirmation].to_s.strip == "EXCLUIR"
      return render_edit(errors: { confirmation: "Digite EXCLUIR para confirmar." })
    end

    result = LastAdminMutation.destroy(@user)
    return render_edit(errors: { confirmation: result.error }) if result.failure?

    if @user == Current.user
      Current.session = nil
      reset_session
      cookies.delete(:session_id)
      redirect_to sign_in_path, status: :see_other, notice: "Conta excluída."
    else
      redirect_to admin_users_path, notice: "Usuário excluído."
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def create_params
    params.expect(admin_user: %i[full_name email role password password_confirmation avatar])
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

  def render_edit(errors: {})
    render inertia: "Admin/Users/Edit", props: {
      user: user_props(@user), roleOptions: role_options, permissions: permissions_for(@user), errors:
    }, status: errors.empty? ? :ok : :unprocessable_content
  end

  def role_options
    [{ value: "admin", label: "Administrador" }, { value: "regular", label: "Usuário regular" }]
  end

  def permissions_for(user)
    other_admin_exists = !user.admin? || User.admin.where.not(id: user.id).exists?
    { edit: true, destroy: other_admin_exists, changeRole: other_admin_exists }
  end
end
