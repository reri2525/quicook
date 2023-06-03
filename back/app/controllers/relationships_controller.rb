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

    def following
      @user = User.find(params[:id])
      @following = @user.following
      @count = @following.count
      render json: {following: 
                    @following.map { |follow| 
                      { name: follow.name, 
                        id: follow.id,
                        avatar: follow.avatar,
                        following: current_user ? @current_user.following.include?(follow) : false,
                      }
                    },
                    count: @count 
                    }
    end

    def followers
      @user = User.find(params[:id])
      @followers = @user.followers
      @count = @followers.count
      render json: {followers: 
                     @followers.map { |follower| 
                      { name: follower.name, 
                        id: follower.id,
                        avatar: follower.avatar,
                        following: current_user ? @current_user.following.include?(follower) : false,
                      }
                    },
                     count: @count 
                    }
    end
end
