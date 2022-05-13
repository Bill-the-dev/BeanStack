class LocationItem < ApplicationRecord
  belongs_to :location
  belongs_to :item

  def self.update_loc_count(value, to_loc_id, from_loc_id) 

  end
end
