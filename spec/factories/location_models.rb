FactoryBot.define do
  factory :location do
    # loc = Faker::Address.full_address_as_hash(:city, :state_abbr, :country_code, :zip)
    # loc { Faker::Address }
    # puts loc
    # puts loc.city
    city { Faker::Address.city }
    state { Faker::Address.state_abbr }
    # country { Faker::Address.country_code }
    country { 'US' } # Faker city,state,zip only within US
    zip { Faker::Address.zip }
    weather { '' }
  end
end