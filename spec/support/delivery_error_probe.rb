# The mounted production probe must not depend on application authentication.
# rubocop:disable-next Rails/ApplicationController
class DeliveryErrorProbeController < ActionController::Base
  skip_forgery_protection

  def show
    raise "sensitive-delivery-error-sentinel"
  end
end

module DeliveryRegistrationErrorProbe
  def create
    password = params.dig(:registration, :password)
    raise "sensitive-delivery-error-sentinel" if password == "sensitive-password-sentinel"

    super
  end
end

Rails.application.config.after_initialize do
  unless RegistrationsController < DeliveryRegistrationErrorProbe
    RegistrationsController.prepend(DeliveryRegistrationErrorProbe)
  end
end

Rails.application.routes.append do
  match "/__delivery_error_probe__", to: "delivery_error_probe#show", via: :all
end
