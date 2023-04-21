Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users
  get '/logged_in', to:  "sessions#logged_in"
  post '/login', to: "sessions#logins"
  delete '/logout', to: "sessions#logout"
  resources :posts 
  resources :hearts, only: [:create, :destroy]
  resources :bookmarks, only: [:create, :destroy]
  resources :relationships, only: [:create, :destroy]
  get '/bookmarks' , to: "posts#bookmark"
  get '/search' , to: "posts#search"
end
