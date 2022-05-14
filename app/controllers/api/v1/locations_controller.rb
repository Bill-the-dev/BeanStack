class Api::V1::LocationsController < ApplicationController
  before_action :set_location, only: %i[ show update destroy ]

  # GET /locations
  def index
    @locations = Location.all

    render json: @locations
  end

  # GET /locations/1
  def show
    render json: @location
  end

  # POST /locations
  def create
    @location = Location.new(location_params)

    if @location.save
      item_ids = Item.all.map { |item| item.id }
      item_ids.each do |item_id|
        # debugger
        LocationItem.create(
          location: Location.find(@location.id),
          item: Item.find(item_id),
          location_quantity: 0
        )
      end  
      render json: @location, status: :created, location: api_v1_locations_path(@location)
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /locations/1
  def update
    if @location.update(location_params)
      render json: api_v1_locations_path(@location)
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # DELETE /locations/1
  def destroy
    @location.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def location_params
      params.require(:location).permit(:city, :state, :country, :zip, :weather, :item_id)

      # note: zip is type 'string' 
    end
end
