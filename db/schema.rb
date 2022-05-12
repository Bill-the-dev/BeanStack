# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_12_171912) do
  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "vendor"
    t.integer "quantity"
    t.decimal "price"
    t.text "description"
    t.string "category"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index "\"location_id\"", name: "index_items_on_location_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "city"
    t.string "state"
    t.string "zip"
    t.text "weather"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations_items", force: :cascade do |t|
    t.integer "location_id"
    t.integer "item_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_locations_items_on_item_id"
    t.index ["location_id"], name: "index_locations_items_on_location_id"
  end

  add_foreign_key "locations_items", "items"
  add_foreign_key "locations_items", "locations"
end
