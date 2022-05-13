
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
25.times do 
  name = Faker::Coffee.blend_name
  vendor = Faker::Coffee.origin
  # quantity = sum of LocationItems @ all locations
  price = rand(5.00..20.99).round(2).to_f
  description = Faker::Coffee.notes
  category = Faker::Coffee.variety
  user_id = 1
  
  Item.create(
    name: name, 
    vendor: vendor, 
    # quantity: set below, 
    price: price,
    description: description, 
    category: category,
    user_id: user_id
  )
end

location_ids = Location.all.map { |location| location.id }
item_ids = Item.all.map { |item| item.id }
# efficiency at scale hash?


# -- LOCATION ITEMS --
location_ids.each do |loc_id|
  item_ids.each do |item_id|
    LocationItem.create(
      location: Location.find(loc_id),
      item: Item.find(item_id),
      location_quantity: rand(5..20)
    )
  end
end
# Assumes seed inefficiency acceptable with arrays and nested iteration O(n^2), as it is only seeded once.

# -- ITEMS TOTAL --
item_ids.each do |item_id|
  total = 0
  location_ids.each do |loc_id|
    item_count = LocationItem.where(location: loc_id, item: item_id).pluck(:location_quantity)[0]
    total += item_count
  end
  # set Item quantity to total
  item = Item.find(item_id)
  item.quantity = total
  item.save
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