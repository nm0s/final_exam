class AuctionSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :reserve_price, :end_date, :user_id

  has_many :bids
    class BidSerializer < ActiveModel::Serializer
      attributes :id, :created_at , :price

    end

    def bids
      object.bids&.order(created_at: :desc)
    end

    def auctions
      object.auction&.order(created_at: :desc)
    end
end
