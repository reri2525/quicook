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

User.create!(name:  "test user",
    avatar: File.open(Rails.root.join('public', 'images', '可愛い女の子1.jpeg')),
    email: "1111test@i.test.jp",
    password:              "111111",
    password_confirmation: "111111",
    introduction: "私はテストユーザーです。",
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
file1 = File.open(image_hamburger)
file2 = File.open(image_fish)
file3 = File.open(image_salad)
users = User.order(:created_at).take(4)
test_user = User.find_by(name: "test user")
titles = [
  "絶品！お肉屋さんのハンバーガーパテ☆",
  "めちゃくちゃ美味しい鯵の干物☆",
  "新鮮で美味しいサラダ☆"
]
files = [
  file1,
  file2,
  file3
]
categories = [
  "お肉",
  "魚介／干物",
  "野菜"
]
contents = [
  "専門店のハンバーグスパイスの種類を調べ、ハンバーガーパテ用に独自にミックスしたら、絶品のジューシーパテになりました！",
  "専門店のハンバーグスパイスの種類を調べ、ハンバーガーパテ用に独自にミックスしたら、絶品のジューシーパテになりました！",
  "専門店のハンバーグスパイスの種類を調べ、ハンバーガーパテ用に独自にミックスしたら、絶品のジューシーパテになりました！"
]
times = [3, 3, 3]
costs = [10000, 3000, 5000]
processes = [
  "溶き卵に生パン粉を入れて混ぜ、ふやかしておきます。冷蔵庫から出したばかりの冷たい牛ひき肉に①の卵パン粉と全てのスパイスと調味料を入れて粘りが出るまで混ぜます。\n肉の食感を重視の人は粘りがでたらすぐ手を止めます。ふんわりジューシーが好みの人はよく混ぜましょう。（でも混ぜすぎに注意！",
  "溶き卵に生パン粉を入れて混ぜ、ふやかしておきます。冷蔵庫から出したばかりの冷たい牛ひき肉に①の卵パン粉と全てのスパイスと調味料を入れて粘りが出るまで混ぜます。\n肉の食感を重視の人は粘りがでたらすぐ手を止めます。ふんわりジューシーが好みの人はよく混ぜましょう。（でも混ぜすぎに注意！",
  "溶き卵に生パン粉を入れて混ぜ、ふやかしておきます。冷蔵庫から出したばかりの冷たい牛ひき肉に①の卵パン粉と全てのスパイスと調味料を入れて粘りが出るまで混ぜます。\n肉の食感を重視の人は粘りがでたらすぐ手を止めます。ふんわりジューシーが好みの人はよく混ぜましょう。（でも混ぜすぎに注意！"
]
coments = [
  "お肉屋さんで粗めに挽いてもらうと美味しさUP！\n混ぜ過ぎ、焼き過ぎに注意。\n焼いている時にフライ返し等で上からギューギュー押さえつけて焼かないこと！ジューシーさとうまみが流れ出しちゃうので。パン粉は必ず生パン粉を使ってください☆",
  "お肉屋さんで粗めに挽いてもらうと美味しさUP！\n混ぜ過ぎ、焼き過ぎに注意。\n焼いている時にフライ返し等で上からギューギュー押さえつけて焼かないこと！ジューシーさとうまみが流れ出しちゃうので。パン粉は必ず生パン粉を使ってください☆",
  "お肉屋さんで粗めに挽いてもらうと美味しさUP！\n混ぜ過ぎ、焼き過ぎに注意。\n焼いている時にフライ返し等で上からギューギュー押さえつけて焼かないこと！ジューシーさとうまみが流れ出しちゃうので。パン粉は必ず生パン粉を使ってください☆"
]
50.times do
3.times do |n|
  users[n].posts.create!(title: titles[n], category: categories[n], image: files[n], content: contents[n], time: times[n], cost: costs[n], process: processes[n], coment: coments[n])
end
end
 

3.times do |m|
 14.times do |n|
    Heart.create!(user_id:  n+1, post_id: m+1)
 end
end

users = User.all
user  = users.first
following = users[2..19]
followers = users[3..10]
following.each { |followed| user.active_relationships.create(followed_id: followed.id) }
followers.each { |follower| follower.active_relationships.create(followed_id: user.id) }