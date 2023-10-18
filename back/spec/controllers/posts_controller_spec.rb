require 'rails_helper'

RSpec.describe PostsController, type: :controller do
    describe "POST #create" do
      context "with valid attributes" do
        before(:each) do
          @user = User.create(name: "Test User1", email: "testuser@example.com", password: "password")
        end

        it "creates a new post" do
          expect {
            @user.posts.build(title: "a", content: "a", category: "お肉", material_1: "a", amount_1: "a",
                                            image: File.open(Rails.root.join('public', 'images', '可愛い女の子1.jpeg')), 
                                            time: 1, cost: 1, process: "a", coment: "a").save
          }.to change(Post, :count).by(1)
        end
      end
    end

    describe "DELETE #destroy" do
      context "with valid attributes" do
        before(:each) do
          @user = User.create(name: "Test User1", email: "testuser@example.com", password: "password")
          @post = Post.create(title: "a", content: "a", category: "お肉",
                              image: File.open(Rails.root.join('public', 'images', '可愛い女の子1.jpeg')), 
                              time: 1, cost: 1, process: "a", coment: "a", user_id: @user.id)
        end
      
        it "deletes the user" do
          expect {
            delete :destroy, params: { id: @post.id }
          }.to change(Post, :count).by(-1)
        end
      end
    end
end