class AuctionsController < ApplicationController
  include CanCan::ControllerAdditions
  before_action :set_auction, only: [:show, :update, :destroy]
  # before_action :authorize_user!, only: [:edit, :update, :destroy]

  # GET /auctions
  def index
    @auctions = Auction.all

    render json: @auctions
  end

  # GET /auctions/1
  def show
    render json: @auction
  end

  # POST /auctions
  def create
    @auction = Auction.new(auction_params)
    @auction.user = current_user
      byebug
    if @auction.save
      render json:  @auction, status: :created, location: @auction
    else
      render json: @auction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /auctions/1
  def update
    if @auction.update(auction_params)
      render json: @auction
    else
      render json: @auction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /auctions/1
  def destroy
    @auction.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_auction
      @auction = Auction.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def auction_params
      params.require(:auction).permit(:title, :description, :reserve_price, :end_date)
    end
    #
    # def authorize_user!
    #   unless can?(:crud, @auction)
    #     flash[:alert] = "Access Denied"
    #     redirect_to j(@auction)
    #   end
    # end
end
