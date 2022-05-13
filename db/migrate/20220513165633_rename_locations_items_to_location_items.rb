class RenameLocationsItemsToLocationItems < ActiveRecord::Migration[7.0]
  def change
    rename_table :locations_items, :location_items
  end
end
