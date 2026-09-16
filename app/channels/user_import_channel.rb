class UserImportChannel < ApplicationCable::Channel
  def subscribed
    import_id = Integer(params[:id], exception: false)
    reject unless UserPolicy.new(current_user).administer? && import_id && UserImport.exists?(import_id)

    stream_from "user_import:#{import_id}"
  end
end
