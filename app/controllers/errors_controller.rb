# The emergency response must not evaluate session-backed application shares.
# rubocop:disable-next Rails/ApplicationController
class ErrorsController < ActionController::Base
  skip_forgery_protection

  def show
    status = request.env.fetch("umanni.error_status")
    response.headers["Cache-Control"] = "no-store"
    @page = DeliveryExceptionsApp.page(status, request.env.fetch("umanni.error_return_path"))
    render :show, layout: false, status: status
  end
end
