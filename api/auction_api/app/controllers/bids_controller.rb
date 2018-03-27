class BidsController < ApplicationController
  include CanCan::ControllerAdditions

  before_action :set_bid, only: [:destroy]
  before_action :authenticate_user!
  before_action :find_auction, only: [:create]

  def create
    @bid = Bid.new(bid_params)
    @bid.user = current_user
    @bid.auction = @auction

    # if !can?(:bid, @auction)
    #   render json: auction_url(@auction.id), errors: "Unpermitted to bid"
    if  @bid.save
      render json: {bid: @bid}, status: :created
    else
      render json: {bid: @bid}, status: :unprocessable_entity
    end
  end


  def destroy
    @bid.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bid
      @bid = Bid.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def bid_params
      params.require(:bid).permit(:price, :auction_id)
    end

    def find_auction
      @auction = Auction.find_by(id: params[:auction_id])
    end
end
