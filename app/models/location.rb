class Location < ApplicationRecord
  has_many :location_items
  has_many :items, 
    through: :location_items, 
    dependent: :destroy

  # after_save :set_weather   
end
