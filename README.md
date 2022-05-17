# BeanStack Inventory Tracking 

## Table of Contents
  
## Installation

Ruby 3.1.0
Rails 7.0.3 

Install
- Run `bundle install` to install all req'd gems
- Run `bundle exec rails db:create` to start local database 
- Run `bundle exec rails db:migrate` to create database tables in the db
- Run `bundle exec rails db:seed` to seet the tables with initial data
- Run `bundle exec rails server -p 3001` to start server on localhost://3001

Testing [WIP]
- Run `bundle exec rspec` to run all tests
- For specific tests by section:
  - Models `bundle exec rspec spec/models`
  - Requests (controller CRUD) `bundle exec rspec spec/request`  

Front end - React and Material UI [WIP]
- (Optional) `npm run start` to start front end React.js on localhost://3000
- Currently functional for `Item` index and CRUD

## BeanStack API Features
- `Item` CRUD
  - Create, Read, Update, and Delete inventory items
- `Location` CRUD
  - Create warehouse locations 
  - Assign new `LocationItem` inventory to specific locations
  - Shift existing `LocationItem` quantities between warehouse locations

## Notes and Assumptions

- Created using `rails new <project_name> --api`
  - Excludes any middleware / Action Controller modules primarily useful for browser applications and skips the 'front end' of `rails g` resource generators.  


### Location CRUD
- Assumes new location starts with all possible inventory items set to `quantity: 0` to allow for easily editable totals across locations (front end). 

- `Zip` 
  - Canadian zip codes use only the 3-character "outwards" codes.
  - US zip codes use only the 5-digit numerical codes.

- `Country` 
  - Use 2-character country codes such as `CA` for Canada or `US` for the United States. 

### Weather API
- Opted not to use a `Weather` model for simplicities' sake.  I'm not sure if this is convention when making a simple external API call.  If more was required I would have kept the *'big model, little controller'* philosophy.
- The API updates the weather data on inital seed and when explicitly called.  Next steps are to use jobs / caching to have the weather update every X minutes.

### Move Item to/from Location
- `LocationItem` model uses `self.update_loc_count` method to move inventory from one location to another. Thinking through this method, I assumed parameters (`value, from_id, to_id`) would likely come from a front end.
- Provided more time, I would validate item quantities to ensure parameter values and results are all poitive integers. Something along the lines of:
  `validates :quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :update_loc_count`


## General
- Created a `user_id` column with the intention of future admin/user authentication and features.

## RSpec Tests
- Opted for `shoulda-matchers` gem, which allows one-line tests with more detailed errors.
- `it { should validate_presence_of(:name) }` is equivalent to:
  ```Ruby
  it "should validate presence of name" do 
    coffee1 = Item.new(quantity: 22, price: 12.99)
    expect(coffee1.valid?).to be false
  end
  ```

  


DB queries (`bundle exec rails console`)
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

- Get location weather
  `Location.where(id: 1).pluck("weather")[0]` 





## Continued Development
This was a fun project to tackle!  Going forward, my immediate priorities include strengthening validations at the model and db levels, continuing to expand RSpec testing, and learning how to incorporate Rails jobs.  On the front end I will continue to build components for all developed features.  

- Validations will be more robust at the model and db levels.
  - `Item.quantity` is assigned AFTER making locations, items, and location_items by counting each matching `LocationItem` in each `Location`.  This should only validate when it is updated, considering an `item` is created without a `quantity` initially. `validates :quantity, on: :update` 
- Inventory utilization tools
  - Inventory 'on-hand' v. 'ordered' with 'arrive by' at location
  - Rate of sales, weeks of supply, cost analysis
- User Authentication
  - User signup, login, logout 
  - Permissions for Admin v. User
  - User group inventories (per company / organization)
- Shipments and purchase order queue
- Custom table columns (sizing, color, etc.)
- AWS S3 hosting and ActiveStorage for product images









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
