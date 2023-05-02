class RelationshipsController < ApplicationController
    def create
      if current_user
        @other_user = User.find(params[:user_id])
        @current_user.active_relationships.create(followed_id: @other_user.id)
        render json: { status: true }
      else
        render json: { status: false }
      end
    end

    def destroy
      if current_user
        Relationship.find_by(followed_id: params[:id], follower_id: @current_user.id).destroy
        render json: {status: true }
      end
    end

    def followers
      @user = User.find(params[:id])
      @followers = @user.followers
      render json: {followers: @followers }
    end
end
