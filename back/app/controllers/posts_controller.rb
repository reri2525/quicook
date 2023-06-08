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
    @post_all = Post.includes(:user, :hearts)
                .left_joins(:hearts)
                .group(:id)
                .reorder('COUNT(hearts.id) DESC, MAX(hearts.created_at) DESC')
                .paginate(page: params[:page], per_page: 20)
    if @post_all.exists?
      render json: { 
        status: true, 
        post_all: @post_all.map { |post|
        if post.image
          file_extension = File.extname(post.image.path).downcase
        end
          if file_extension == ".mp4" || file_extension == ".webm"
            file_type = "video"
          else
            file_type = "image"
          end
          {
           id: post.id,
           title: post.title, 
           image: post.image,
           heart_count: post.hearts.count,
           file_type: file_type,
           user: { 
             name: post.user.name,
             avatar: post.user.avatar,
             id: post.user.id
           },
           bookmarks: current_user ? post.bookmarks.where(user_id: @current_user.id).map { |bookmark| 
             { id: bookmark.id, user_id: bookmark.user_id } 
           } : nil,
           hearts: current_user ? post.hearts.where(user_id: @current_user.id).map { |heart| 
            { id: heart.id, user_id: heart.user_id } 
           } : nil,
          } 
      },total_pages:@post_all.total_pages}
     else
        render json: {status: false}
     end
  end

  def user_posts_index
      @posts = Post.includes(:user).where(user_id: params[:id]).paginate(page: params[:page], per_page: 20)
     if @posts.exists?
       render json: { 
         status: true, 
         post_all: @posts.map { |post|
           file_extension = File.extname(post.image.path).downcase
           if file_extension == ".mp4" || file_extension == ".webm"
             file_type = "video"
           else
             file_type = "image"
           end
           {
            id: post.id,
            title: post.title, 
            image: post.image,
            heart_count: post.hearts.count,
            file_type: file_type,
            user: { 
              name: post.user.name,
              avatar: post.user.avatar,
              id: post.user.id
            },
            bookmarks: current_user ? post.bookmarks.where(user_id: @current_user.id).map { |bookmark| 
              { id: bookmark.id, user_id: bookmark.user_id } 
            } : nil,
            hearts: current_user ? post.hearts.where(user_id: @current_user.id).map { |heart| 
             { id: heart.id, user_id: heart.user_id } 
            } : nil,
           } 
       },total_pages:@posts.total_pages}
      else
         render json: {status: false}
      end
  end

  def show
      @post = Post.includes(:user).find(params[:id])
      if @post.present?
        post = @post
        file_extension = File.extname(post.image.path).downcase
        if file_extension == ".mp4" || file_extension == ".webm"
          file_type = "video"
        else
          file_type = "image"
        end
        bookmark = current_user ? post.bookmarks.find_by(user_id: @current_user.id) : nil
        heart = current_user ? post.hearts.find_by(user_id: @current_user.id) : nil
        relationship = current_user ? Relationship.find_by(followed_id: post.user.id, follower_id: @current_user.id) : nil  
        render json: { 
          status: true, 
          post: {
            id: post.id,
            title: post.title, 
            image: post.image,
            content: post.content,
            time: post.time,
            cost: post.cost,
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
        render json: {status: false}
      end
  end

  def bookmark 
    if current_user
      @bookmark_posts = @current_user.bookmarks_posts.paginate(page: params[:page], per_page: 30)
     if @bookmark_posts.exists?
      render json: { 
        status: true, 
        post_all: @bookmark_posts.map { |post|
          if post.image
            file_extension = File.extname(post.image.path).downcase
          end
            if file_extension == ".mp4" || file_extension == ".webm"
              file_type = "video"
            else
              file_type = "image"
            end
          {
           id: post.id,
           title: post.title, 
           image: post.image,
           file_type: file_type,
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

  def following
    if current_user
      @following_posts = @current_user.following_posts.paginate(page: params[:page], per_page: 30)
     if @following_posts.exists?
      render json: { 
        status: true, 
        post_all: @following_posts.map { |post|
          if post.image
            file_extension = File.extname(post.image.path).downcase
          end
            if file_extension == ".mp4" || file_extension == ".webm"
              file_type = "video"
            else
              file_type = "image"
            end
          {
           id: post.id,
           title: post.title, 
           image: post.image,
           file_type: file_type,
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
      },total_pages: @following_posts.total_pages}
     else
        render json: {status: false}
     end
    end
  end

  def search
      search_query = "%#{params[:query].downcase}%"
      @post_all = Post.includes(:user, :hearts)
                  .where("title LIKE ?", "%#{search_query}%")
                  .left_joins(:hearts)
                  .group(:id)
                  .reorder('COUNT(hearts.id) DESC, MAX(hearts.created_at) DESC')
                  .paginate(page: params[:page], per_page: 20)
      if @post_all.exists?
        render json: { 
          status: true, 
          post_all: @post_all.map { |post|
            if post.image
              file_extension = File.extname(post.image.path).downcase
            end
              if file_extension == ".mp4" || file_extension == ".webm"
                file_type = "video"
              else
                file_type = "image"
              end
            {
             id: post.id,
             title: post.title, 
             image: post.image,
             file_type: file_type,
             heart_count: post.hearts.count,
             user: { 
               name: post.user.name,
               avatar: post.user.avatar,
               id: post.user.id
             },
             bookmarks: current_user ? post.bookmarks.where(user_id: @current_user.id).map { |bookmark| 
               { id: bookmark.id, user_id: bookmark.user_id }
             } : nil,
             hearts: current_user ? post.hearts.where(user_id: @current_user.id).map { |heart| 
              { id: heart.id, user_id: heart.user_id }
             } : nil,
            } 
        },total_pages:@post_all.total_pages}
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
     @post_all = Post.includes(:user, :hearts)
                .where("category LIKE ?", "%#{category_query}%")
                .left_joins(:hearts)
                .group(:id)
                .reorder('COUNT(hearts.id) DESC, MAX(hearts.created_at) DESC')
                .paginate(page: params[:page], per_page: 20)
     if @post_all.exists?
       render json: { 
         status: true, 
         post_all: @post_all.map { |post|
         if post.image
           file_extension = File.extname(post.image.path).downcase
         end
           if file_extension == ".mp4" || file_extension == ".webm"
             file_type = "video"
           else
             file_type = "image"
           end
           {
            id: post.id,
            title: post.title, 
            image: post.image,
            heart_count: post.hearts.count,
            file_type: file_type,
            user: { 
              name: post.user.name,
              avatar: post.user.avatar,
              id: post.user.id
            },
            bookmarks: current_user ? post.bookmarks.where(user_id: @current_user.id).map { |bookmark| 
              { id: bookmark.id, user_id: bookmark.user_id }
            } : nil,
            hearts: current_user ? post.hearts.where(user_id: @current_user.id).map { |heart| 
             { id: heart.id, user_id: heart.user_id }
            } : nil,
           } 
       },total_pages:@post_all.total_pages}
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
     params.require(:post).permit(:title, :category, :content,  :image, :time, :cost, 
      :material_1,:material_2,:material_3,:material_4,:material_5,:material_6,:material_7,
      :material_8,:material_9,:material_10,:material_11,:material_12,:material_13,:material_14,
      :material_15,
      :amount_1,:amount_2,:amount_3,:amount_4,:amount_5,:amount_6,:amount_7,:amount_8,
      :amount_9,:amount_10,:amount_11,:amount_12,:amount_13,:amount_14,:amount_15,
      :process, :coment)
   end
end
