class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :vendor
      t.integer :quantity
      t.decimal :price
      t.text :description
      t.string :category
      t.integer :user_id
      t.index :location_id

      t.timestamps
    end
  end
end
