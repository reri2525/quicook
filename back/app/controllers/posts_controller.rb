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
    @posts = Post.includes(:user, :hearts)
                 .left_joins(:hearts)
                 .group(:id)
                 .reorder('COUNT(hearts.id) DESC, MAX(hearts.created_at) DESC')
                 .paginate(page: params[:page], per_page: 27)
    if @posts.exists?
      response_data = generate_response_data(@posts)
      render json: response_data  
    else
      render json: {status: false}
    end
  end

  def user_posts_index
     @posts = Post.includes(:user).where(user_id: params[:id]).paginate(page: params[:page], per_page: 20)
     if @posts.exists?
      response_data = generate_response_data(@posts)
      render json: response_data  
     else
      render json: {status: false}
     end
  end

  def show
      @post = Post.includes(:user).find(params[:id])
      if @post.present?
        response_data = generate_response_data_show(@post)
        render json: response_data  
      else
        render json: {status: false}
      end
  end

  def bookmark 
    if current_user
      @posts = @current_user.bookmarks_posts.paginate(page: params[:page], per_page: 60)
      if @posts.exists?
        response_data = generate_response_data(@posts)
        render json: response_data  
      else
        render json: {status: false}
      end
    end
  end

  def following
    if current_user
      @posts = @current_user.following_posts.paginate(page: params[:page], per_page: 60)
      if @posts.exists?
        response_data = generate_response_data(@posts)
        render json: response_data  
      else
        render json: {status: false}
      end
    end
  end

  def search
      search_query = "%#{params[:query].downcase}%"
      @posts = Post.includes(:user, :hearts)
                  .where("title LIKE ?", "%#{search_query}%")
                  .left_joins(:hearts)
                  .group(:id)
                  .reorder('COUNT(hearts.id) DESC, MAX(hearts.created_at) DESC')
                  .paginate(page: params[:page], per_page: 15)
      if @posts.exists?
        response_data = generate_response_data(@posts)
        render json: response_data  
      else
        render json: {status: false}
      end
  end

  def category
     if params[:query].include?("／")
       category_query = params[:query].split("／").last
     else
       category_query = params[:query]
     end
     @posts = Post.includes(:user, :hearts)
                .where("category LIKE ?", "%#{category_query}%")
                .left_joins(:hearts)
                .group(:id)
                .reorder('COUNT(hearts.id) DESC, MAX(hearts.created_at) DESC')
                .paginate(page: params[:page], per_page: 15)
     if @posts.exists?
       response_data = generate_response_data(@posts)
       render json: response_data  
     else
       render json: {status: false}
     end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      render json: {status: true}
    else
      render json: {status: false}
    end
  end

  private

   def post_params
     params.require(:post).permit(:title, :category, :content,  :image, :thumbnail, :time, :cost, :number_of_people,
      :material_1,:material_2,:material_3,:material_4,:material_5,:material_6,:material_7,
      :material_8,:material_9,:material_10,:material_11,:material_12,:material_13,:material_14,
      :material_15,
      :amount_1,:amount_2,:amount_3,:amount_4,:amount_5,:amount_6,:amount_7,:amount_8,
      :amount_9,:amount_10,:amount_11,:amount_12,:amount_13,:amount_14,:amount_15,
      :process, :coment)
   end

   def generate_response_data(posts)
    if posts.present?
      response_data = {
        status: true,
        post_all: posts.map do |post|
          file_extension = File.extname(post.image.path).downcase
          file_type = (file_extension == ".mp4" || file_extension == ".webm") ? "video" : "image"

          {
            id: post.id,
            title: post.title, 
            image: post.image,
            thumbnail: post.thumbnail,
            heart_count: post.hearts.count,
            file_type: file_type,
            user: { 
              name: post.user.name,
              avatar: post.user.avatar,
              id: post.user.id
            },
            bookmarks: current_user ? post.bookmarks.where(user_id: current_user.id).map { |bookmark| 
              { id: bookmark.id, user_id: bookmark.user_id } 
            } : nil,
            hearts: current_user ? post.hearts.where(user_id: current_user.id).map { |heart| 
             { id: heart.id, user_id: heart.user_id } 
            } : nil,
          }
        end,
        total_pages: posts.total_pages
      }
    else
      response_data = { status: false }
    end
    response_data
  end

  def generate_response_data_show(post)
    if post.present?
      file_extension = File.extname(post.image.path).downcase
      if file_extension == ".mp4" || file_extension == ".webm"
        file_type = "video"
      else
        file_type = "image"
      end
      bookmark = current_user ? post.bookmarks.find_by(user_id: @current_user.id) : nil
      heart = current_user ? post.hearts.find_by(user_id: @current_user.id) : nil
      relationship = current_user ? Relationship.find_by(followed_id: post.user.id, follower_id: @current_user.id) : nil 
      response_data = { 
        status: true, 
        post: {
          id: post.id,
          title: post.title, 
          image: post.image,
          content: post.content,
          time: post.time,
          cost: post.cost,
          number_of_people: post.number_of_people,
          materials: (1..15).map { |i| { :"material_#{i}" => post.send("material_#{i}") } }.reduce({}, :merge),
          amounts: (1..15).map { |i| { :"amount_#{i}" => post.send("amount_#{i}") } }.reduce({}, :merge),
          process: post.process,
          coment: post.coment,
          hearts_count: post.hearts.count,
          file_type: file_type,
          user: { 
            name: post.user.name,
            avatar: post.user.avatar,
            id: post.user.id
          },
          bookmarked: bookmark ? true : false,
          hearted: heart ? true : false,
          relationship: relationship ? true : false
        }
      }
    else
      response_data = { status: false }
    end
    response_data
  end
end
