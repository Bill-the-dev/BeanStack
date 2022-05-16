require 'rails_helper'

RSpec.describe Item, type: :model do
  
  # let(:item) { create(:item, name: "" )}
  subject(:item) do 
    FactoryBot.create(:item)
    # FactoryBot.create(:location)
    # FactoryBot.create(:location_item)
    # FactoryBot.build(:location)
    # :item.location = :location
  end

  describe "validations" do
    it do 
      should validate_uniqueness_of(:name)
        .scoped_to(:vendor)
        .with_message("name should be unique to vendor")
    end
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:price) } 
    # it do 
    #   should validate_presence_of(:quantity) 
    #     .on(:update)
    # end
  end

  # test function not presence
  describe "associations" do 
    # it { should have_many{:location_items} }
    # it { should have_many{:locations}.through(:location_items) }
  end

  describe "model CRUD" do 
    # it 'checks that an item can be created' do
    #   expect(:item).to be_valid
    # end

    # it 'checks that an item can be read' do
    #   expect(Item.find_by_name("Dark Horse")).to eq(:item)
    # end

    # it 'checks that an item can be updated' do
    #   @item.update(:name => "Black Beauty")
    #   expect(Item.find_by_name("Black Beauty")).to eq(:item)
    # end

    # it 'checks that an item can be destroyed' do
    #   :item.destroy
    #   expect(Item.find_by_name("Black Beauty")).to be_nil
    # end
  end

  # before(:all) do
  #   @item = Item.create!(
  #     name: "Dark Horse", 
  #     vendor: "Coffee Corral", 
  #     price: 22.99,
  #     description: "dark chocolate, earthy, smooth", 
  #     category: "Sumatra",
  #     user_id: 1
  #   )
  # end

  
end