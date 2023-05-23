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

ActiveRecord::Schema[7.0].define(version: 2023_05_23_124947) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "vector"

  create_table "book_pages", force: :cascade do |t|
    t.integer "number"
    t.text "content", null: false
    t.integer "tokens"
    t.vector "embedding", limit: 1536
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["embedding"], name: "index_book_pages_on_embedding", opclass: :vector_ip_ops, using: :ivfflat
    t.index ["number"], name: "index_book_pages_on_number", unique: true
  end

  create_table "questions", force: :cascade do |t|
    t.string "question", limit: 140, null: false
    t.string "slug", null: false
    t.text "answer"
    t.integer "ask_count", default: 1
    t.string "audio_src_url"
    t.vector "embedding", limit: 1536
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_questions_on_slug", unique: true
  end

end
