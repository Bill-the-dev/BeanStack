Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :items
      resources :locations do
        resources :items
      end
    end
  end
  # Defines the root path route ("/")
  root to: "items#index"
end
