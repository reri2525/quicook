# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(name:  "クイクック公式",
    avatar: File.open(Rails.root.join('public', 'images', 'Q.jpeg')),
    email: "quicook@mail.jp",
    password:              "111111",
    password_confirmation: "111111",
    introduction: "クイクック公式アカウントです。",
    activated: false,
    )

User.create!(name:  "gest user",
    avatar: File.open(Rails.root.join('public', 'images', '可愛い女の子1.jpeg')),
    email: "1111test@i.test.jp",
    password:              "111111",
    password_confirmation: "111111",
    introduction: "ゲストユーザーです",
    activated: true,
    activated_at: Time.zone.now
    )

4.times do |m|
 5.times do |n|
  name = Faker::Japanese::Name.name[0, 10]
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
image_beef = Rails.root.join('public', 'images', '牛丼.jpg')
image_rice = Rails.root.join('public', 'images', '悪魔のおにぎり.jpg')
image_chicken = Rails.root.join('public', 'images', '唐揚げくん.jpg')
image_vegetable = Rails.root.join('public', 'images', 'サラダ.webp')
file1 = File.open(image_beef)
file2 = File.open(image_rice)
file3 = File.open(image_chicken)
users = User.order(:created_at).take(4)
user = User.find(1)
titles = [
  "ガッツリスタミナ牛肉炒め",
  "ローソンの悪魔のおにぎり再現!",
  "ローソン風唐揚げ"
]
files = [
  file1,
  file2,
  file3
]
categories = [
  "お肉／牛肉",
  "魚介／干物",
  "野菜"
]
contents = [
  "スタミナ料理です。",
  "ローソン100の悪魔の具を再現しました。",
  "専門店のハンバーグスパイスの種類を調べ、ハンバーガーパテ用に独自にミックスしたら、絶品のジューシーパテになりました！"
]
times = ["約7", 3, 3]
costs = ["約1000", 500, 5000]
number_of_people = [
  "1~2人分",
  "1個",
  "25個"
]
material_1 = [ "玉葱2Lサイズ", "ご飯" ]
amount_1 = [ "1/4個", "100g"]
material_2 = [ "牛バラ薄切り肉", '塩' ]
amount_2 = [ "200g", "小さじ1/4"]
material_3 = [ "○醤油", "海苔"]
amount_3 = [ "大さじ1", "一枚"]
material_4 = [ "○みりん", "天かす" ]
amount_4 = [ "大さじ1", "大さじ1" ]
material_5 = [ "○酒", "麺つゆ(3倍濃縮)" ]
amount_5 = [ "大さじ1", "小さじ1" ]
material_6 = [ "○コチュジャン", "アオサ" ]
amount_6 = [ "小さじ1/2", "小さじ1/4" ]
material_7 = [ "○砂糖", "鰹節、紅生姜、胡麻油" ]
amount_7 = [ "小さじ1", "各少々" ]
material_8 = [ "○ごま油" ]
amount_8 = [ "大さじ1" ]
material_9 = [ "○ニンニクすりおろし" ]
amount_9 = [ "大さじ1" ]
material_10 = [ "ごま油（炒め用）" ]
amount_10 = [ "大さじ1" ]
process = [ 
  "フライパンにごま油を入れ、くし切りにした玉葱を炒める。玉葱に火が通ったら、牛バラ肉を入れ、7割くらい火が通るまで炒める。○の調味料を合わせたものを2のフライパンに入れる。牛肉に火が通り、タレが絡まったら完成!
   丼にご飯を盛り、タレごとトッピングして出来上がり！",
  "1,天かす、麺つゆ、アオサ、鰹節、紅生姜、胡麻油を合わせてよく混ぜる。ご飯に塩をよく混ぜて1と詰めて、握って、海苔を巻く。",
  "a"
]
coments = [
  "肉に火を通し過ぎないように、7割程度火が通った時点でタレを投入する。",
  "「イカ入り天かす」使用。ヤマサ「昆布つゆ」使用。かつおと昆布のめんつゆで再現性アップ。",
  "a"
]
60.times do
 3.times do |n|
  user.posts.create!(title: titles[n], category: categories[n], image: files[n], 
                     thumbnail: files[n], content: contents[n], time: times[n], number_of_people: number_of_people[n],
                     material_1: material_1[n], material_2: material_2[n], material_3: material_3[n], 
                     material_4: material_4[n], material_5: material_5[n], material_6: material_6[n], 
                     material_7: material_7[n], material_8: material_8[n], material_9: material_9[n],
                     amount_1: amount_1[n], amount_2: amount_2[n], amount_3: amount_3[n],
                     amount_4: amount_4[n], amount_5: amount_5[n], amount_6: amount_6[n],
                     amount_7: amount_7[n], amount_8: amount_8[n], 
                     cost: costs[n], process: process[n], coment: coments[n])
 end
end

 

90.times do |m|
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