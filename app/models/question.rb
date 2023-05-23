class Question < ApplicationRecord
  validates :question, presence: true, length: { maximum: 140 }
  validates :slug, presence: true, uniqueness: true

  def bump_ask_count
    Question.increment_counter(:ask_count, id)
  end
end
