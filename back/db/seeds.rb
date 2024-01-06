# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(name:  "クイクック公式",
    avatar: File.open(Rails.root.join('public', 'images', 'Q.jpeg')),
    email: "quicook.online@gmail.com",
    password:              "111111",
    password_confirmation: "111111",
    introduction: "クイクック公式アカウントです。",
    activated: true,
    activated_at: Time.zone.now
    )

User.create!(name:  "gest user",
    avatar: File.open(Rails.root.join('public', 'images', '初期アイコン.jpeg')),
    email: "gest123@gest.jp",
    password:              "gestuser",
    password_confirmation: "gestuser",
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
image_spaghetti = Rails.root.join('public', 'images', 'ミートソース.jpeg')
image_potate = Rails.root.join('public', 'images', 'フライドポテト.jpeg')
image_sausage = Rails.root.join('public', 'images', 'ウインナー丼.jpg')
video_sausage = Rails.root.join('public', 'videos', 'ウインナー丼.mp4')
image_fish = Rails.root.join('public', 'images', '鯵の干物.jpeg')
image_test = Rails.root.join('public', 'images', '可愛い女の子5.jpeg')
test_file = File.open(image_test)
thumbnail_file1 = File.open(image_beef)
contents_file1 = File.open(image_beef)
thumbnail_file2 = File.open(image_rice)
contents_file2 = File.open(image_rice)
thumbnail_file3 = File.open(image_chicken)
contents_file3 = File.open(image_chicken)
thumbnail_file4 = File.open(image_potate)
contents_file4 = File.open(image_potate)
thumbnail_file5 = File.open(image_spaghetti)
contents_file5 = File.open(image_spaghetti)
thumbnail_file6 = File.open(image_sausage)
contents_file6 = File.open(video_sausage)

users = User.order(:created_at).take(4)
user = User.find(1)
titles = [
  "ガッツリスタミナ牛肉炒め",
  "ローソンの悪魔のおにぎり再現!",
  "ローソン風唐揚げ",
  "フライドポテト",  
  "ミートソースパスタ",
  "卵かけウインナー丼",
]
thumbnail_files = [
  thumbnail_file1,
  thumbnail_file2,
  thumbnail_file3,
  thumbnail_file4,
  thumbnail_file5,
  thumbnail_file6,
]
contents_files = [
  contents_file1,
  contents_file2,
  contents_file3,
  contents_file4,
  contents_file5,
  contents_file6,
]
categories = [
  "お肉／牛肉",
  "ご飯もの／おにぎり",
  "お肉／鶏肉",
  "なし",
  "麺／パスタ",
  "お肉／豚肉",
]
contents = [
  "スタミナ料理です。",
  "ローソン100の悪魔の具を再現しました。",
  "唐揚げくん作った!",
  "フライドポテト作ってみました。",
  "作り置きしておくとすぐできます。",
  "簡単ウインナー丼!"
]
times = ["約7", 3, 5, 5, 3, 3]
costs = ["約1000", "約500", "約500", "約500", "約500", "約500"]
number_of_people = [
  "1~2人分",
  "1個",
  "25個",
  "じゃがいも4個分",
  "2人前",
  "一人分"
]
material_1 = [ "玉葱2Lサイズ", "ご飯", "鶏胸肉", "サラダ油", "湯", "ご飯" ]
amount_1 = [ "1/4個", "100g", "1枚（300g程", "フライパンに3〜4㎝", "1リットル", "1人前"]
material_2 = [ "牛バラ薄切り肉", '塩', "塩麹", "★じゃがいも(くし切り・8等分)", "塩", "ウインナー" ]
amount_2 = [ "200g", "小さじ1/4", "20g", "4個", "小さじ2", "1袋"]
material_3 = [ "○醤油", "海苔", "醤油", "塩", "パスタ", "バター"]
amount_3 = [ "大さじ1", "一枚", "小さじ1", "少々", "200〜250g", "少量"]
material_4 = [ "○みりん", "天かす", "生姜", "オリーブオイル", "", "醤油" ]
amount_4 = [ "大さじ1", "大さじ1", "1かけ", "大さじ1", "", "適量" ]
material_5 = [ "○酒", "麺つゆ(3倍濃縮)", "卵", "", "", "卵" ]
amount_5 = [ "大さじ1", "小さじ1", "1個", "", "", "1個" ]
material_6 = [ "○コチュジャン", "アオサ", "薄力粉" ]
amount_6 = [ "小さじ1/2", "小さじ1/4", "大さじ1" ]
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
  "1,鶏胸肉を1センチ幅程度に切り、ナイロン袋に入れて塩麹を20g入れ軽くもんで冷蔵庫で1時間～1晩寝かす。2,フードプロセッサーに肉を入れミンチにする。3,卵と薄力粉、醤油、生姜を追加で入れてさらに回す。4,油を180度で予熱して、スプーン2つを油に浸してからからあげ君の大きさ程度に丸めて油に落とす。5,スプーンは都度油につっこんでくださいね！きれいにまとまります！両面きれいに焼色がついたら完成です！。",
  "1,(★)じゃがいもの皮を剥きくし切りにする。キッチンペーパーで水気をしっかり拭き取る。2,サラダ油で揚げる。2,両面こんがりして来たら出来上がり。キッチンペーパーで油を切る。",
  "1,湯1ℓに塩を入れ、パスタを茹でる。2,茹で上がったら、パスタをザルにあけ、オリーブオイルを混ぜる。3,皿に盛り、温めたミートソースを掛けて完成。",
  "バターをフライパンに挽いて切ったソーセージと醤油を入れて炒める,ご飯に盛り付けて生卵をかけたら完成!"
]
coments = [
  "肉に火を通し過ぎないように、7割程度火が通った時点でタレを投入する。",
  "「イカ入り天かす」使用。ヤマサ「昆布つゆ」使用。かつおと昆布のめんつゆで再現性アップ。",
  "フードプロセッサーで手も汚れず簡単にできます！",
  "自家製ポテト！",
  "パスタにオリーブオイルを掛けておくと麺がくっつきません。",
  "動画の撮り方下手ですみませんw"
]


6.times do |n|
 user.posts.create!(title: titles[n], category: categories[n], image: contents_files[n], 
                     thumbnail: thumbnail_files[n], content: contents[n], time: times[n], number_of_people: number_of_people[n],
                     material_1: material_1[n], material_2: material_2[n], material_3: material_3[n], 
                     material_4: material_4[n], material_5: material_5[n], material_6: material_6[n], 
                     material_7: material_7[n], material_8: material_8[n], material_9: material_9[n],
                     amount_1: amount_1[n], amount_2: amount_2[n], amount_3: amount_3[n],
                     amount_4: amount_4[n], amount_5: amount_5[n], amount_6: amount_6[n],
                     amount_7: amount_7[n], amount_8: amount_8[n], 
                     cost: costs[n], process: process[n], coment: coments[n])
end

360.times do |n|
 user.posts.create!(title: "ページネーションテスト", image: test_file,
                                             thumbnail: test_file,
                                             content: "なし", time: "なし", number_of_people: "1人分", material_1: "なし", amount_1: "なし",
                                             cost: "なし", process: "なし", coment: "なし")
end

18.times do |n|
  Heart.create!(user_id: n+1, post_id: 1)
end

15.times do |n|
  Heart.create!(user_id: n+1, post_id: 2)
end

13.times do |n|
  Heart.create!(user_id: n+1, post_id: 3)
end

11.times do |n|
  Heart.create!(user_id: n+1, post_id: 4)
end

16.times do |n|
  Heart.create!(user_id: n+1, post_id: 5)
end

19.times do |n|
  Heart.create!(user_id: n+1, post_id: 6)
end

users = User.all
user  = users.first
following = users[2..19]
followers = users[3..10]
following.each { |followed| user.active_relationships.create(followed_id: followed.id) }
followers.each { |follower| follower.active_relationships.create(followed_id: user.id) }