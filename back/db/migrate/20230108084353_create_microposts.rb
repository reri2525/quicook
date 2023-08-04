class CreateMicroposts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :category, index: true
      t.string :title, index: true
      t.text :content
      t.string :image
      t.string :thumbnail
      t.string :time
      t.string :cost
      t.string :number_of_people
      t.string :material_1
      t.string :material_2
      t.string :material_3
      t.string :material_4
      t.string :material_5
      t.string :material_6
      t.string :material_7
      t.string :material_8
      t.string :material_9
      t.string :material_10
      t.string :material_11
      t.string :material_12
      t.string :material_13
      t.string :material_14
      t.string :material_15
      t.string :amount_1
      t.string :amount_2
      t.string :amount_3
      t.string :amount_4
      t.string :amount_5
      t.string :amount_6
      t.string :amount_7
      t.string :amount_8
      t.string :amount_9
      t.string :amount_10
      t.string :amount_11
      t.string :amount_12
      t.string :amount_13
      t.string :amount_14
      t.string :amount_15
      t.text :process
      t.text :coment
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
