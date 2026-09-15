class Admin::BaseController < ApplicationController
  before_action :require_admin

  private

  def require_admin
    head :forbidden unless UserPolicy.new(Current.user).administer?
  end
end
