class User < ApplicationRecord
    attr_accessor :remember_token, :activation_token, :reset_token, :email_token
    before_save   :downcase_email
    before_create :create_activation_digest
    has_many :posts, dependent: :destroy
    has_many :active_relationships, class_name:  "Relationship",
                                    foreign_key: "follower_id",
                                    dependent:   :destroy
    has_many :passive_relationships, class_name:  "Relationship",
                                     foreign_key: "followed_id",
                                     dependent:   :destroy
    has_many :following, through: :active_relationships, source: :followed
    has_many :followers, through: :passive_relationships, source: :follower
    has_many :hearts, dependent: :destroy
    has_many :bookmarks, dependent: :destroy
    has_many :following_posts, through: :following, source: :posts
    has_many :bookmarks_posts, through: :bookmarks, source: :post
    mount_uploader :avatar, AvatarUploader
    validates :name,  presence: true, length: { maximum: 10 }
    validates :introduction, length: { maximum: 130 }
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: { maximum: 255 },
                      format: { with: VALID_EMAIL_REGEX },
                      uniqueness: { case_sensitive: false }
    has_secure_password  
    validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
    
         
     # 渡された文字列のハッシュ値を返す
    def User.digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                 BCrypt::Engine.cost
      BCrypt::Password.create(string, cost: cost)
    end

    # ランダムなトークンを返す
    def User.new_token
      SecureRandom.urlsafe_base64
    end

    # 永続セッションのためにユーザーをデータベースに記憶する
    def remember
      self.remember_token = User.new_token
      update_attribute(:remember_digest, User.digest(remember_token))
    end

    # アカウントを有効にする
    def activate
      update_attribute(:activated,    true)
      update_attribute(:activated_at, Time.zone.now)
    end

    # パスワード再設定の属性を設定する
    def create_reset_digest
      self.reset_token = User.new_token
      update_attribute(:reset_digest,  User.digest(reset_token))
      update_attribute(:reset_sent_at, Time.zone.now)
    end

    # パスワード再設定の期限が切れている場合はtrueを返す
    def password_reset_expired?
     reset_sent_at < 2.hours.ago
    end

    # メールアドレスの変更
    def update_email_digest
      self.email_token  = User.new_token
      update_attribute(:email_digest, User.digest(email_token))
      update_attribute(:email_sent_at, Time.zone.now)
    end

    # 渡されたトークンがダイジェストと一致したらtrueを返す
    def authenticated?(attribute, token)
      digest = send("#{attribute}_digest")
      return false if digest.nil?
      BCrypt::Password.new(digest).is_password?(token)
    end

    private

     # メールアドレスをすべて小文字にする
     def downcase_email
       self.email = email.downcase
     end

     def create_activation_digest
      self.activation_token  = User.new_token
      self.activation_digest = User.digest(activation_token)
     end
end

