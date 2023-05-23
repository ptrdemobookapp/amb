Rails.application.routes.draw do
  namespace :api do
    resources :questions, only: [:create, :show]
  end

  get '*path', to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root 'home#index'
end
