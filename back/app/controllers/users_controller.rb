class UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.avatar = File.open(Rails.root.join('public', 'images', '初期アイコン.jpeg'))
        if @user.save
            UserMailer.account_activation(@user).deliver_now
            render json: { status: :created, user: @user }
        else
            render json: { status: :no, user: @user }
        end
    end
    def edit 
      if current_user
        render json: { user: @current_user }
      end
    end
    def show 
        @user = User.find(params[:id])
        @posts_count = @user.posts.count
        @followed_count = @user.following.count
        @follower_count = @user.followers.count
        if current_user
         relationship = Relationship.find_by(followed_id: @user.id, follower_id: @current_user.id)
        end
         if @current_user
             render json: { status: :true, user: @user, relationship: relationship ? true : false,
                            followed_count: @followed_count, follower_count: @follower_count, posts_count: @posts_count }
         else
             render json: { status: :false, user: @user, followed_count: @followed_count, 
                            follower_count: @follower_count, posts_count: @posts_count  }
         end
    end

    def update
        @user = User.find(params[:id])
        if @user.email == params[:email]
           @user.update(user_params)
           if @user.save
               render json: { status: :true, user: @user }
           else
               render json: { status: :false}
           end
        else
        end
    end

    def destroy
        if current_user
          reset_session
        end
        if User.find(params[:id]).destroy
            render json: { status: :true}
        else
            render json: { status: :false}
        end
    end

    def password_reset
        @user = User.find_by(email: params[:sent_email])
        if @user
           UserMailer.password_reset(@user).deliver_now
        else
           
        end
    end

    private

        def user_params
            params.require(:user).permit(:name, :introduction, :avatar, :email, :password, 
                :password_confirmation, :sent_email)
        end
end