class Post < ApplicationRecord
  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  has_many :hearts, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarks_user, through: :bookmarks, source: :post
  mount_uploader :image, ImageUploader
  mount_uploader :thumbnail, ThumbnailUploader
  validates :title, length: { maximum: 30 }
  validates :content, length: { maximum: 300 }
  validates :time, length: { maximum: 8 }
  validates :cost, length: { maximum: 10 }
  validates :process, length: { maximum: 300 }
  validates :coment, length: { maximum: 200 }
  default_scope { order(created_at: :desc) }
end
