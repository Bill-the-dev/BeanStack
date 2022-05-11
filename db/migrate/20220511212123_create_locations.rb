class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.string :city
      t.string :state
      t.string :zip
      t.text :weather

      t.timestamps
    end
  end
end
