class Post < ApplicationRecord
  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  has_many :hearts, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarks_user, through: :bookmarks, source: :post
  mount_uploader :image, ImageUploader
  validates :title,  presence: true, length: { maximum: 30 }
  validates :content,  presence: true, length: { maximum: 300 }
  validates :time,  presence: true, length: { maximum: 1 }
  validates :cost,  presence: true, length: { maximum: 5 }
  validates :process,  presence: true, length: { maximum: 300 }
  validates :coment,  presence: true, length: { maximum: 200 }
  default_scope { order(created_at: :desc) }
end
