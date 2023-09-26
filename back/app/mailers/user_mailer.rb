class UserMailer < ApplicationMailer
    def account_activation(user)
        @user = user
        mail to: @user.email, subject: "アカウント認証"
    end

    def update_email(user)
        @user = user
        mail to: @user.email, subject: "メールアドレス変更"
    end

    def password_reset(user)
        @user = user
        mail to: @user.email, subject: "パスワード再設定"
    end
end
