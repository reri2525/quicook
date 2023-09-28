class UpdateEmailsController < ApplicationController
    def edit
        @user = User.find_by(id: params[:id])
        unless (@user && @user.activated? &&
        @user.authenticated?(:email, params[:id]))
        redirect_to ENV['FRONT_URL'] 
        return
        end
        redirect_to "#{ENV['FRONT_URL']}/update/#{params[:email]}/email/#{@user.id}"
    end

    def update
        @user = find_by(id: params[:user][:id])
        if @user.update_attribute(email: params[:user][:email])
            render json: { status: true } 
        else
            render json: { status: false }
        end
    end
end