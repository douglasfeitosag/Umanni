class FoundationController < ApplicationController
  allow_unauthenticated_access

  def show
    render inertia: "Foundation/Show", props: { app: { name: "Umanni", version: "0.2.0" } }
  end
end
