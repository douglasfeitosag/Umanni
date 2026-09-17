Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  get "sign-up", to: "registrations#new", as: :sign_up
  post "sign-up", to: "registrations#create"
  get "sign-in", to: "sessions#new", as: :sign_in
  resource :session, only: %i[create destroy]
  resource :profile, only: %i[show edit update destroy]
  namespace :admin do
    resource :dashboard, only: :show
    resources :users do
      post :set_initial_password, on: :member, path: :initial_password
    end
    resources :user_imports, only: %i[index show create]
    match "*unmatched", to: "unmatched_routes#show", via: :all
  end
  root "sessions#new"
  get "up" => "rails/health#show", as: :rails_health_check
  get "ready" => "delivery_readiness#show", as: :delivery_readiness
end
