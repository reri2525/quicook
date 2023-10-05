Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'healthcheck#hc'
  get '/logged_in', to:  "sessions#logged_in"
  post '/login', to: "sessions#logins"
  delete '/logout', to: "sessions#logout"
  get '/followers/:id', to: "relationships#followers"
  get '/following/:id', to: "relationships#following"
  get '/user/:id/posts', to: "posts#user_posts_index"
  get '/bookmarks', to: "posts#bookmark"
  get '/following', to: "posts#following" 
  get '/search/:query' , to: "posts#search"
  get '/category/:query', to: "posts#category"
  resources :users
  resources :posts 
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:create, :edit, :update]
  resources :update_emails, only: [:edit, :update]
  resources :hearts, only: [:create, :destroy]
  resources :bookmarks, only: [:create, :destroy]
  resources :relationships, only: [:create, :destroy]
end
