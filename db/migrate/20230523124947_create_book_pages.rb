class CreateBookPages < ActiveRecord::Migration[7.0]
  def change
    create_table :book_pages do |t|
      t.integer :number, index: { unique: true }
      t.text :content, null: false
      t.integer :tokens
      t.vector :embedding, limit: 1536

      t.timestamps
    end

    add_index :book_pages, :embedding, using: :ivfflat, opclass: :vector_ip_ops
  end
end
