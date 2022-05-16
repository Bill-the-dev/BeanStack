require 'rails_helper'

# RSpec.describe 'Items Api', type: :request do
#   # initialize data
#   let!(:items) { 
#     10.times do 
#       name = Faker::Coffee.blend_name
#       vendor = Faker::Coffee.origin
#       # quantity = sum of LocationItems @ all locations, set separately
#       price = rand(5.00..20.99).round(2).to_f
#       description = Faker::Coffee.notes
#       category = Faker::Coffee.variety
#       user_id = 1
      
#       Item.create(
#         name: name, 
#         vendor: vendor,  
#         price: price,
#         description: description, 
#         category: category,
#         user_id: user_id
#       )
#     end 
#   }
#   let(:item_id){items.first.id}
    
#   # GET /items - INDEX
#   describe "GET /api/v1/items" do
    
#     before { get '/api/v1/items' }
      
#       it 'returns items ' do
#       	expect(json).not_to be_empty
#       	expect(json.size).to eq(10)
#       end
	  
# 	  it 'returns status code 200' do
# 	  	expect(response).to have_http_status(200)
# 	  end	
#   end
    
#   # GET /items/:id - SHOW
#   describe "GET /items/:id" do
    
#     before { get "/items/#{item_id}" }
    
#     context 'when the record exists' do
#       it 'returns item' do
#         expect(json).not_to be_empty
#         expect(json['id']).to eq(item_id)
#       end

#       it 'returns status code 200' do
#         expect(response).to have_http_status(200)
#       end
#     end  

#     context 'when the record does not exist' do  
#       let(:item_id){100}
      
#       it 'returns status code 404' do
#         expect(response).to have_http_status(404)
#       end 	
#     end	
#   end

#   # POST /items - CREATE 
#   describe "POST /items" do
#     let(:valid_attributes) { {name: 'Code Fuel', created_by: '1'} }
    
#     context "when the request is valid" do
#       before { post '/items', {params: valid_attributes} } 
      
#       it "successfully creates an item" do
#         expect(json['name']).to eq('Code Fuel')
#       end

#       it "returns status code 201" do
#         expect(response).to have_http_status(201)
#       end	
#     end

#     context "when the request is invalid" do
#       before {post '/items', params: {name: 42} }
#       it "returns status code 422" do
#         expect(response).to have_http_status(422)
#       end
#     end	
#   end
    
#   # PUT /items/:id - UPDATE 
#   describe "PUT /items/:id" do
#     let(:valid_attributes) { { name: 'Kicking Horse' } }	
	
#     context "when the item is updated" do
#       before { put "/items/#{item_id}", params: valid_attributes }
      
#       it "successfully updates record" do
#         expect(json['name']).to eq('Kicking Horse')
#       end
      
#       it "returns status code 200" do
#         expect(response).to have_http_status(200)
#       end	
#     end

#     context "when request attributes are invalid" do
#       before { put "/items/#{item_id}", params: {name: nil} }
      
#       it "returns status code 422" do
#         expect(response).to have_http_status(422)
#       end
#     end
#   end

# 	# DELETE /items/:id - DESTROY
# 	describe "DELETE /items/:id" do
#     context "when the item is deleted"
#       before { delete "/items/#{item_id}" }	
      
#       it "returns status code 204" do
#         expect(response).to have_http_status(204)
#       end
#     end
# 	end	
