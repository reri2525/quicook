require 'rails_helper'

RSpec.describe UsersController, type: :controller do
    describe "POST #create" do
      context "with valid attributes" do
        it "creates a new user" do
          expect {
            post :create, params: { user: { name: "Test User", email: "testuser@example.com", password: "password" } }
          }.to change(User, :count).by(1)
        end
      end
    end

    describe "DELETE #destroy" do
      context "with valid attributes" do
        before(:each) do
          @user = User.create(name: "Test User2", email: "testuserr@example.com", password: "password")
        end
      
        it "deletes the user" do
          expect {
            delete :destroy, params: { id: @user.id }
          }.to change(User, :count).by(-1)
        end
      end
    end
end