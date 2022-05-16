class Location < ApplicationRecord
  validates :city, :country, :zip, presence: true
  validates :zip, uniqueness: true
  
  has_many :location_items
  has_many :items, 
    through: :location_items, 
    dependent: :destroy

  # after_save :set_weather   
end
