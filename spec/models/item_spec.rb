require 'rails_helper'

RSpec.describe Item, type: :model do
  before(:all) do
    @item = Item.create!(
      name: "Dark Horse", 
      vendor: "Coffee Corral", 
      price: 22.99,
      description: "dark chocolate, earthy, smooth", 
      category: "Sumatra",
      user_id: 1
    )
  end

  it 'checks that an item can be created' do
    expect(@item).to be_valid
  end

  it 'checks that an item can be read' do
    expect(Item.find_by_name("Dark Horse")).to eq(@item)
  end

  it 'checks that an item can be updated' do
    @item.update(:name => "Black Beauty")
    expect(Item.find_by_name("Black Beauty")).to eq(@item)
  end

  it 'checks that an item can be destroyed' do
    @item.destroy
    expect(Item.find_by_name("Black Beauty")).to be_nil
  end
end