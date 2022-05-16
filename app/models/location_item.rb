class LocationItem < ApplicationRecord
  # does this work?
  # validates :quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :update_loc_count

  belongs_to :location
  belongs_to :item

  # MOVE LOCATION_ITEM
  def self.update_loc_count(value, from_id, to_id) 
    from_loc_item = LocationItem.find(from_id)
    to_loc_item = LocationItem.find(to_id)
    
    if (
      to_loc_item.item_id == from_loc_item.item_id && 
      to_loc_item.location_id != from_loc_item.location_id
    )  
      from_loc_item.location_quantity -= value
      if from_loc_item.save!
        to_loc_item.location_quantity += value
        to_loc_item.save!
      end
    end
  end
  # item ids must match, location ids must differ
  # value int as number of items to move
  # subtract from origin, from_id, update
  # add to destination, to_id, update
end
