# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_03_05_142617) do

  create_table "bookmarks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_bookmarks_on_post_id"
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

  create_table "hearts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_hearts_on_post_id"
    t.index ["user_id"], name: "index_hearts_on_user_id"
  end

  create_table "posts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "category"
    t.string "title"
    t.text "content"
    t.string "image"
    t.string "thumbnail"
    t.string "time"
    t.string "cost"
    t.string "number_of_people"
    t.string "material_1"
    t.string "material_2"
    t.string "material_3"
    t.string "material_4"
    t.string "material_5"
    t.string "material_6"
    t.string "material_7"
    t.string "material_8"
    t.string "material_9"
    t.string "material_10"
    t.string "material_11"
    t.string "material_12"
    t.string "material_13"
    t.string "material_14"
    t.string "material_15"
    t.string "amount_1"
    t.string "amount_2"
    t.string "amount_3"
    t.string "amount_4"
    t.string "amount_5"
    t.string "amount_6"
    t.string "amount_7"
    t.string "amount_8"
    t.string "amount_9"
    t.string "amount_10"
    t.string "amount_11"
    t.string "amount_12"
    t.string "amount_13"
    t.string "amount_14"
    t.string "amount_15"
    t.text "process"
    t.text "coment"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category"], name: "index_posts_on_category"
    t.index ["title"], name: "index_posts_on_title"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "relationships", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "follower_id"
    t.integer "followed_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "introduction"
    t.string "email"
    t.string "password_digest"
    t.string "avatar"
    t.string "activation_digest"
    t.boolean "activated", default: false
    t.datetime "activated_at"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.string "email_digest"
    t.string "email_sent_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "bookmarks", "posts"
  add_foreign_key "bookmarks", "users"
  add_foreign_key "hearts", "posts"
  add_foreign_key "hearts", "users"
  add_foreign_key "posts", "users"
end
