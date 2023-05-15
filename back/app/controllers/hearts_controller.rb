class HeartsController < ApplicationController
    def create
      if current_user
        @post_heart = Heart.new(user_id: @current_user.id, post_id: params[:post_id])
      end
        if @post_heart.save
          render json: { status: true }
        else
          render json: { status: false }
        end
    end
    def destroy
     if current_user 
      @post_heart = Heart.find_by(user_id: @current_user.id, post_id: params[:id])
      if @post_heart.destroy
        render json: { status: true }
      else
        render json: { status: false }
      end
     end
    end
end
