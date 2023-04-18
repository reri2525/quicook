class PostsController < ApplicationController
  def create
    if current_user
      @post = @current_user.posts.build(post_params)
      if @post.save   
        render json: { status: true, post: @post }
      else 
        render json: { status: :not_created }
      end
    end
  end

  def index
   if current_user
    @post_all = Post.includes(:user).paginate(page: params[:page], per_page: 20)
    if @post_all.exists?
      render json: { 
        status: true, 
        post_all: @post_all.map { |post|
          {
           id: post.id,
           title: post.title, 
           image: post.image,
           heart_count: post.hearts.count,
           user: { 
             name: post.user.name,
             avatar: post.user.avatar,
             id: post.user.id
           },
           bookmarks: post.bookmarks.where(user_id: @current_user.id).map { |bookmark| 
             { id: bookmark.id, user_id: bookmark.user_id } 
           },
           hearts: post.hearts.where(user_id: @current_user.id).map { |heart| 
            { id: heart.id, user_id: heart.user_id } 
           }
          } 
      },total_pages:@post_all.total_pages}
     else
        render json: {status: false}
     end
    end
  end

  def show
    @post = Post.includes(:user)
    .joins(:user)
    .select('posts.*, users.name, users.avatar, COUNT(hearts.id) as hearts_count')
    .left_outer_joins(:hearts)
    .where(id: params[:id])
    .group('posts.id, users.id')
    .first
     hearts_count = @post.try(:hearts_count) || 0
     bookmark = Bookmark.find_by(user_id: current_user.id, post_id: @post.id)
     heart = Heart.find_by(user_id: current_user.id, post_id: @post.id)
     render json: { post: @post.as_json.merge(hearts_count: hearts_count, bookmarked: !!bookmark, hearted: !!heart) }

  end

  def bookmark 
    if current_user
      @bookmark_posts = @current_user.bookmarks_posts.paginate(page: params[:page], per_page: 30)
     if @bookmark_posts.exists?
      render json: { 
        status: true, 
        post_all: @bookmark_posts.map { |post|
          {
           id: post.id,
           title: post.title, 
           image: post.image,
           heart_count: post.hearts.count,
           user: { 
             name: post.user.name,
             avatar: post.user.avatar
           },
           bookmarks: post.bookmarks.where(user_id: @current_user.id).map { |bookmark| 
             { id: bookmark.id, user_id: bookmark.user_id } 
           },
           hearts: post.hearts.map { |heart| 
            { id: heart.id, user_id: heart.user_id } 
           }
          } 
      },total_pages: @bookmark_posts.total_pages}
     else
        render json: {status: false}
     end
    end
  end
  def search
    if current_user
      @search = params[:search]
      search_query = "%#{@search.downcase}%"
      @post_all = Post.includes(:user, :hearts).where("LOWER(title) LIKE ? OR LOWER(content) LIKE ?", search_query, search_query)
                                               .left_joins(:hearts)
                                               .group(:id).order('COUNT(hearts.id) DESC', 'MAX(hearts.created_at) DESC')
                                               .paginate(page: params[:page], per_page: 30)
      if @post_all.exists?
        render json: { 
          status: true, 
          post_all: @post_all.map { |post|
            {
             id: post.id,
             title: post.title, 
             image: post.image,
             heart_count: post.hearts.count,
             user: { 
               name: post.user.name,
               avatar: post.user.avatar
             },
             bookmarks: post.bookmarks.where(user_id: @current_user.id).map { |bookmark| 
               { id: bookmark.id, user_id: bookmark.user_id } 
             },
             hearts: post.hearts.where(user_id: @current_user.id).map { |heart| 
              { id: heart.id, user_id: heart.user_id } 
             }
            } 
        },total_pages:@post_all.total_pages}
      else
          render json: {status: false}
      end
    end
  end

  private
  def post_params
    params.require(:post).permit(:title, :content,  :image, :time, :cost, 
      :material_1,:material_2,:material_3,:material_4,:material_5,:material_6,:material_7,
      :material_8,:material_9,:material_10,:material_11,:material_12,:material_13,:material_14,
      :material_15,
      :amount_1,:amount_2,:amount_3,:amount_4,:amount_5,:amount_6,:amount_7,:amount_8,
      :amount_9,:amount_10,:amount_11,:amount_12,:amount_13,:amount_14,:amount_15,
      :process, :coment)
  end
end
