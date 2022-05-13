class AddQuantityToLocationItems < ActiveRecord::Migration[7.0]
  def change
    add_column :locations_items, :location_quantity, :integer
  end
end
