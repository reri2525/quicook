class SessionsController < ApplicationController
    def logins
        @user = User.find_by(email: session_params[:email])
        if @user && @user.authenticate(session_params[:password])
          if @user.activated?
            login(@user)
            render json: { logged_in: true, 
            user: {
                name: @user.name,
                id: @user.id,
                avatar: {
                    url: @user.avatar.url
                }
            } }
          else
            render json: { status: 401, errors: "有効なアカウントを選択してください!"}
          end
        else
            render json: { status: 401, errors: "認証に失敗しました。正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください!"}
        end
    end
    def logged_in
        if current_user
            render json: { logged_in: true, 
            user: {
                name: current_user.name,
                id: current_user.id,
                avatar: {
                    url: current_user.avatar.url
                }
            }}
        else
            render json: { logged_in: false, message: 'ユーザーが存在しません' }
        end
    end
    def logout
        reset_session
        render json: { status: 200, logged_out: true }
    end
    private

        def session_params
            params.require(:user).permit(:email, :password)
        end

end