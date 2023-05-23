# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(name:  "杉田　裕貴",
    avatar: File.open(Rails.root.join('public', 'images', '可愛い女の子1.jpeg')),
    email: "0831yuuki@i.softbank.jp",
    password:              "111111",
    password_confirmation: "111111",
    introduction: "私はリーバルです。",
    )



4.times do |m|
 5.times do |n|
  name  = Faker::Japanese::Name.name
  avatar = File.open(Rails.root.join('public', 'images', "可愛い女の子#{n+1}.jpeg"))
  email = "083#{n+1}#{m+1}yuuki@i.softbank.jp"
  password = "111111"
  introduction = "私は#{name}です。"
  User.create!(name:  name,
        avatar: avatar,
        email: email,
        password:              password,
        password_confirmation: password,
        introduction: introduction,
        )
 end
end

# マイクロポスト
image_hamburger = Rails.root.join('public', 'images', 'food-image.jpg')
image_fish = Rails.root.join('public', 'images', '鯵の干物.jpeg')
image_salad = Rails.root.join('public', 'images', 'サラダ.webp')
video_about_me = Rails.root.join('public', 'videos', 'Kenshi Yonezu - Melancholy Kitchen  [RUS SUB] (【米津玄篩】メランコリーキッチン).mp4')
file1 = File.open(image_hamburger)
file2 = File.open(image_fish)
file3 = File.open(image_salad)
file4 = File.open(video_about_me)
users = User.order(:created_at).take(6)

10.times do
  title = "絶品！お肉屋さんのハンバーガーパテ☆"
  category = "お肉"
  content = "専門店のハンバーグスパイスの種類を調べ、ハンバーガーパテ用に独自にミックスしたら、絶品のジューシーパテになりました！"
  time = 3
  cost = 10000
  process = "溶き卵に生パン粉を入れて混ぜ、ふやかしておきます。冷蔵庫から出したばかりの冷たい牛ひき肉に①の卵パン粉と全てのスパイスと調味料を入れて粘りが出るまで混ぜます。
             肉の食感を重視の人は粘りがでたらすぐ手を止めます。ふんわりジューシーが好みの人はよく混ぜましょう。（でも混ぜすぎに注意！"
  coment = "お肉屋さんで粗めに挽いてもらうと美味しさUP！　混ぜ過ぎ、焼き過ぎに注意。
            焼いている時にフライ返し等で上からギューギュー押さえつけて焼かないこと！ジューシーさとうまみが流れ出しちゃうので。パン粉は必ず生パン粉を使ってください☆"
  users.each { |user| user.posts.create!(title: title, category: category, image: file1, content: content, time: time, cost: cost, process: process, coment: coment) }
end

10.times do
  title = "めちゃくちゃ美味しい鯵の干物☆"
  category = "魚介／干物"
  content = "専門店のハンバーグスパイスの種類を調べ、ハンバーガーパテ用に独自にミックスしたら、絶品のジューシーパテになりました！"
  time = 3
  cost = 3000
  process = "溶き卵に生パン粉を入れて混ぜ、ふやかしておきます。冷蔵庫から出したばかりの冷たい牛ひき肉に①の卵パン粉と全てのスパイスと調味料を入れて粘りが出るまで混ぜます。
             肉の食感を重視の人は粘りがでたらすぐ手を止めます。ふんわりジューシーが好みの人はよく混ぜましょう。（でも混ぜすぎに注意！"
  coment = "お肉屋さんで粗めに挽いてもらうと美味しさUP！　混ぜ過ぎ、焼き過ぎに注意。
            焼いている時にフライ返し等で上からギューギュー押さえつけて焼かないこと！ジューシーさとうまみが流れ出しちゃうので。パン粉は必ず生パン粉を使ってください☆"
  users.each { |user| user.posts.create!(title: title, category: category, image: file2, content: content, time: time, cost: cost, process: process, coment: coment) }
end

10.times do
  title = "新鮮で美味しいサラダ☆"
  category = "野菜／サラダ"
  content = "専門店のハンバーグスパイスの種類を調べ、ハンバーガーパテ用に独自にミックスしたら、絶品のジューシーパテになりました！"
  time = 3
  cost = 7000
  process = "溶き卵に生パン粉を入れて混ぜ、ふやかしておきます。冷蔵庫から出したばかりの冷たい牛ひき肉に①の卵パン粉と全てのスパイスと調味料を入れて粘りが出るまで混ぜます。
             肉の食感を重視の人は粘りがでたらすぐ手を止めます。ふんわりジューシーが好みの人はよく混ぜましょう。（でも混ぜすぎに注意！"
  coment = "お肉屋さんで粗めに挽いてもらうと美味しさUP！　混ぜ過ぎ、焼き過ぎに注意。
            焼いている時にフライ返し等で上からギューギュー押さえつけて焼かないこと！ジューシーさとうまみが流れ出しちゃうので。パン粉は必ず生パン粉を使ってください☆"
  users.each { |user| user.posts.create!(title: title, category: category, image: file3, content: content, time: time, cost: cost, process: process, coment: coment) }
end
 
10.times do
  title = "牛肉"
  category = "お肉／牛肉"
  content = "専門店のハンバーグスパイスの種類を調べ、ハンバーガーパテ用に独自にミックスしたら、絶品のジューシーパテになりました！"
  time = 3
  cost = 10000
  process = "溶き卵に生パン粉を入れて混ぜ、ふやかしておきます。冷蔵庫から出したばかりの冷たい牛ひき肉に①の卵パン粉と全てのスパイスと調味料を入れて粘りが出るまで混ぜます。
             肉の食感を重視の人は粘りがでたらすぐ手を止めます。ふんわりジューシーが好みの人はよく混ぜましょう。（でも混ぜすぎに注意！"
  coment = "お肉屋さんで粗めに挽いてもらうと美味しさUP！　混ぜ過ぎ、焼き過ぎに注意。
            焼いている時にフライ返し等で上からギューギュー押さえつけて焼かないこと！ジューシーさとうまみが流れ出しちゃうので。パン粉は必ず生パン粉を使ってください☆"
  users.each { |user| user.posts.create!(title: title, category: category, image: file1, content: content, time: time, cost: cost, process: process, coment: coment) }
end

240.times do |m|
 10.times do |n|
    Heart.create!(user_id:  n+1, post_id: m+1)
 end
end

users = User.all
user  = users.first
following = users[2..19]
followers = users[3..10]
following.each { |followed| user.active_relationships.create(followed_id: followed.id) }
followers.each { |follower| follower.active_relationships.create(followed_id: user.id) }