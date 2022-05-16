class Location < ApplicationRecord
  validates :city, :country, :zip, presence: true
  validates :zip, uniqueness: {case_sensitive: false}

  has_many :location_items
  has_many :items, 
    through: :location_items, 
    dependent: :destroy

  after_initialize :set_weather 

  def set_weather
  
  end
end
