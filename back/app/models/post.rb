class Post < ApplicationRecord
  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  has_many :hearts, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarks_user, through: :bookmarks, source: :post
  mount_uploader :image, ImageUploader
  default_scope { order(created_at: :desc) }
  def hearts?(user)
    hearts.where(user_id: user.id).exists?
  end
  def bookmarks?(user)
    favorites.where(user_id: user.id).exists?
 end
end
