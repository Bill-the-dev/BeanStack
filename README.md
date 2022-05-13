# README


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


## Location CRUD
- Assumes new location starts with all possible inventory items set to `quantity: 0` to allow for easily editable totals across locations (front end).      
















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
