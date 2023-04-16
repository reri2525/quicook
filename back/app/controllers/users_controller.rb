class UsersController < ApplicationController
    def create
        @user = User.new(user_params)
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
        if @user
            render json: { status: :true, user: @user }
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