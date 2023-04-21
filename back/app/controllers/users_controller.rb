class UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.avatar = File.open(Rails.root.join('public', 'images', '初期アイコン.jpeg'))
        if @user.save
            login(@user)
            render json: { status: :created, user: @user }
        else
            render json: { status: :no, user: @user }
        end
    end
    def edit 
        
    end
    def show 
        @user = User.find(params[:id])
        @followed_count = @user.following.count
        @follower_count = @user.followers.count
        if current_user
         relationship = Relationship.find_by(followed_id: @user.id, follower_id: @current_user.id)
        end
         if @current_user
             render json: { status: :true, user: @user, relationship: relationship ? true : false,
                            followed_count: @followed_count, follower_count: @follower_count }
         else
             render json: { status: :false, user: @user }
         end
    end
    private

        def user_params
            params.require(:user).permit(:name, :email, :password, 
                :password_confirmation)
        end
end