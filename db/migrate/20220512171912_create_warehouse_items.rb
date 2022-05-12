class CreateWarehouseItems < ActiveRecord::Migration[7.0]
  def change
    create_table :locations_items do |t|
      t.references :location, index: true, foreign_key: true
      t.references :item, index: true, foreign_key: true

      t.timestamps
    end
  end
end
