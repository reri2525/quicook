class PasswordResetsController < ApplicationController

    def create     
        @user = User.find_by(email: params[:sent_email])
        if @user
          @user.create_reset_digest
          UserMailer.password_reset(@user).deliver_now
          render json: { status: :true }          
        else
          render json: { status: :false, errors: "メールアドレスが正しくないか登録されてません。" }
        end
    end

    def update
      email = params[:user][:email]
      email.slice!(0, 2)
      user = User.find_by(email: email)
      if user.update(user_params)
         login(user)
         render json: { status: true } 
      else
         render json: { status: false }
      end
    end

    def edit
      @user = User.find_by(email: params[:email])
      unless (@user && @user.activated? &&
        @user.authenticated?(:reset, params[:id]))
        redirect_to ENV['FRONT_URL']
        return
      end
      redirect_to "#{ENV['FRONT_URL']}/password/#{params[:email]}/reset"
    end

    private

     def user_params
       params.require(:user).permit(:password, :password_confirmation, :email)
     end

end
