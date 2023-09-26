class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :introduction
      t.string :email
      t.string :password_digest
      t.string :avatar
      t.string :activation_digest
      t.boolean :activated, default: false
      t.datetime :activated_at
      t.string :reset_digest
      t.datetime :reset_sent_at
      t.string :email_digest
      t.string :email_sent_at
      t.timestamps
    end
  end
end
