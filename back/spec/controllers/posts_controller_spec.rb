require 'rails_helper'

RSpec.describe PostsController, type: :controller do
    describe "POST #create" do
      context "with valid attributes" do
        it "creates a new post" do
          expect {
            post :create, params: { post: { title: "a", content: "a", 
                                            image: File.open(Rails.root.join('public', 'images', '可愛い女の子1.jpeg')), 
                                            time: "1", cost: "1", process: "a", coment: "a" } }
          }.to change(Post, :count).by(1)
        end
      end
    end
    describe "DELETE #destroy" do
      context "with valid attributes" do
        before(:each) do
          @post = Post.create(title: "a", content: "a", 
                              image: File.open(Rails.root.join('public', 'images', '可愛い女の子1.jpeg')), 
                              time: "1", cost: "1", process: "a", coment: "a")
        end
      
        it "deletes the user" do
          expect {
            @post.destroy
          }.to change(Post, :count).by(-1)
        end
      end
    end
end