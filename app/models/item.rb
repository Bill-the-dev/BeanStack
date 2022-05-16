class Item < ApplicationRecord
  validates :name, :quantity, :price, presence: true
  validates :name, uniqueness: true

  has_many :location_items
  has_many :locations,
    through: :location_items
end
