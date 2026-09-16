class UserImportChannel < ApplicationCable::Channel
  def subscribed
    reject unless UserPolicy.new(current_user).administer? && UserImport.exists?(params[:id])

    stream_from "user_import:#{params[:id]}"
  end
end
