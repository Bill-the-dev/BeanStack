require 'rails_helper'

# begin
#   ItemsController
# rescue
#   ItemsController = nil
# end

RSpec.describe ItemsController, :type => :controller do
  describe "GET #index" do
    # before { get '/api/v1/items' }
    it "renders the items index" do
      # get :index
      get '/api/v1/items'
      expect(response).to be_success
      expect(response).to render_template(:index)
    end
  end
end