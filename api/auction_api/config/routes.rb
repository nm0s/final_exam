Rails.application.routes.draw do
  resources :auctions do
    resources :bids, only: [:create, :destroy]
  end

  resources :tokens, only: [:create]
end
