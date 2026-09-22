module Admin
  class UnmatchedRoutesController < BaseController
    def show
      raise ActionController::RoutingError, "No route matches #{request.path}"
    end
  end
end
