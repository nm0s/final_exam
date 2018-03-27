class Auction < ApplicationRecord
  belongs_to :user
  has_many :bids

  validates :title, :description, :reserve_price, :end_date, presence: true

  
end
