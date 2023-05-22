Rails.application.routes.draw do
  namespace :api do
    resources :questions do
      get :random, on: :collection
    end
  end

  get '*path', to: "home#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  root 'home#index'
end
