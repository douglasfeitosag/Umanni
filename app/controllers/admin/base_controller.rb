module Admin
  class BaseController < ApplicationController
    before_action :require_admin

    private

    def require_admin
      return if UserPolicy.new(Current.user).administer?

      status, headers, body = DeliveryExceptionsApp.safe_error_response(
        request.env, status: 403, return_path: "/profile"
      )
      self.status = status
      headers.each { |name, value| response.headers[name] = value }
      self.response_body = body
    end
  end
end
