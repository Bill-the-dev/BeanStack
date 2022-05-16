# README

Created using `rails new <project_name> --api`
  - excludes any middleware / Action Controller modules primarily useful for browser applications and skips the 'front end' of `rails g` resource generators.  


DB queries (`rails console`)
- All items 
  `Item.all`
- All locations
  `Location.all`
- All location items
  `LocationItem.all`
- All items at a given location (example `id: 10`)
  `LocationItem.where(location: 10)`
- Quantity of a given item at a given location (example location `id: 1`, item `id: 3`)
  `LocationItem.where(location: 1, item: 3).select("location_quantity")` 
- Move # quantity from location 1 to location 2
  `LocationItem.update_loc_count(value, from_id, to_id)`

## Location CRUD
- Assumes new location starts with all possible inventory items set to `quantity: 0` to allow for easily editable totals across locations (front end). 

`Zip` 
- Canadian zip codes use only the 3-character "outwards" codes.
- US zip codes use only the 5-digit numerical codes.

`Country` 
- Use 2-character countru codes such as `CA` for Canada or `US` for the United States. 

## Weather API
- Opted not to use a `Weather` model for simplicities' sake.  I'm not sure if this is convention when making a simple external API call.  If there was more to be done I would have kept the 'big model, little controller' philosophy.
- The API updates the weather data on inital seed and when explicitly called.  Next steps are to use jobs / caching to have the weather update every X minutes.

## Move Item to/from Location
- `LocationItem#self.update_loc_count` should this be called as a dedicated route?  Currently called through `rails c`.
  - Does this validation work? `validates :quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :update_loc_count`
## General
- Created a `user_id` column with the intention of future user auth features.

## RSpec Tests
- Opted for `shoulda-matchers` gem, which allows one-line tests with more detailed errors.
- `it { should validate_presence_of(:name) }` is equivalent to:
  ```Ruby
  it "should validate presence of name" do 
    coffee1 = Item.new(quantity: 22, price: 12.99)
    expect(coffee1.valid?).to be false
  end
  ```
- `Item.quantity` is assigned AFTER making locations, items, and location_items by counting each matching `LocationItem` in each `Location`.  This should only validate when it is updated, considering an `item` is created without a `quantity` initially. `validates :quantity, on: :update`    

















This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
