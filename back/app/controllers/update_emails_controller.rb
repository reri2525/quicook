class UpdateEmailsController < ApplicationController
    def edit
        @user = User.find_by(email: params[:email])
        unless (@user && @user.activated? &&
        @user.authenticated?(:email, params[:id]))
        redirect_to ENV['FRONT_URL'] 
        return
        end
        redirect_to "#{ENV['FRONT_URL']}/update/#{params[:email]}/email"
    end

    def update
        
    end
end