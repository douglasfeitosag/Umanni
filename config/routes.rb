Rails.application.routes.draw do
  get "sign-up", to: "registrations#new", as: :sign_up
  post "sign-up", to: "registrations#create"
  get "sign-in", to: "sessions#new", as: :sign_in
  resource :session, only: %i[create destroy]
  resource :profile, only: %i[show edit update destroy]
  namespace :admin do
    resource :dashboard, only: :show
    resources :users
  end
  root "foundation#show"
  get "up" => "rails/health#show", as: :rails_health_check
end
