class BookmarksController < ApplicationController
    def create
        if current_user
            @post = Post.find(params[:post_id])
            @bookmark = @post.bookmarks.new(user_id: @current_user.id)
            post = Post.find(params[:post_id])
            if @bookmark.save
              render json: { status: true }
            else
              render json: { status: false }
            end
        else
            render json: { status: false }
        end
    end
    def destroy
     if current_user
        @post = Bookmark.find_by(user_id: @current_user.id, post_id: params[:id])
        if @post.destroy
            render json: { status: true }
        else
            render json: { status: false }
        end
     end
    end
end
