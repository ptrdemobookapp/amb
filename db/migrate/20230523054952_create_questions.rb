class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    enable_extension "vector"

    create_table :questions do |t|
      t.string :question, null: false, limit: 140
      t.string :slug, null: false
      t.text :answer, limit: 1000
      t.integer :ask_count, default: 1
      t.string :audio_src_url
      t.vector :embedding, limit: 4096
      t.timestamps
    end
    add_index :questions, :slug, unique: true
  end
end
