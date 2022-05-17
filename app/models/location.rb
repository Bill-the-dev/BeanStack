class Location < ApplicationRecord
  validates :city, :country, :zip, presence: true
  validates :zip, uniqueness: {case_sensitive: false}

  has_many :location_items
  has_many :items, 
    through: :location_items, 
    dependent: :destroy

  # `Item.quantity` is assigned AFTER making locations, items, and location_items by counting each matching `LocationItem` in each `Location`.  This should only validate when it is updated, considering an `item` is created without a `quantity` initially. `validates :quantity, on: :update` had unexpected behavior during testing and was removed.

  # after_initialize :set_weather 

  # def set_weather
  
  # end
end
