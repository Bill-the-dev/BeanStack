# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)




# -- LOCATIONS --

new_york = Location.create(
  city: 'New York',
  state: 'NY',
  zip: '10018',
  weather: ''
)

chicago = Location.create(
  city: 'Chicago',
  state: 'IL',
  zip: '60657',
  weather: ''
)

ottawa = Location.create(
  city: 'Ottawa',
  state: 'ON',
  zip: 'K2P 2L8',
  weather: ''
)

san_francisco = Location.create(
  city: 'San Francisco',
  state: 'CA',
  zip: '94105',
  weather: ''
)

denver = Location.create(
  city: 'Denver',
  state: 'CO',
  zip: '80205',
  weather: ''
)

# -- ITEMS --
35.times do 
  name = Faker::Coffee.blend_name
  vendor = Faker::Coffee.origin
  # quantity = rand(0..99)    # sum of id @ all locations?
  price = rand(5.00..20.99).round(2).to_f
  description = Faker::Coffee.notes
  category = Faker::Coffee.variety
  user_id = 1
  
  Item.create(
    name: name, 
    vendor: vendor, 
    # quantity: quantity, 
    price: price,
    description: description, 
    category: category,
    user_id: user_id
  )
end

location_ids = Location.all.map { |location| location.id }
item_ids = Item.all.map { |item| item.id }
# efficiency at scale hash?

# Assumes seed inefficiency acceptable with arrays and nested iteration O(n^2), as it is only seeded once.
location_ids.each do |loc_id|
  item_ids.each do |item_id|
    LocationItem.create(
      location: Location.find(loc_id),
      item: Item.find(item_id),
      location_quantity: 10
    )
  end
end

  # t.string "name" # Faker::Coffee.blend_name #=> "Summer Solstice"
  # t.string "vendor" # Faker::Coffee.origin #=> "Antigua, Guatemala"
  # t.integer "quantity"
  # t.decimal "price"
  # t.text "description" # Faker::Coffee.notes #=> "balanced, silky, marzipan, orange-creamsicle, bergamot"
  # t.string "category" # Faker::Coffee.variety #=> "Pacas"
  # t.integer "user_id"
  # t.datetime "created_at", null: false
  # t.datetime "updated_at", null: false
  # t.index "\"location_id\"", name: "index_items_on_location_id"