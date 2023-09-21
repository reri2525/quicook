class PasswordResetsController < ApplicationController
    def create
        sent_email = params[:sent_email]
        user = User.find_by(email: sent_email)
        if user
          user.create_reset_digest
          UserMailer.password_reset(user).deliver_now
          render json: { status: :true }          
        else
          render json: { status: :false, errors: "メールアドレスが正しくないか登録されてません。" }
        end
    end
end
