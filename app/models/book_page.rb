class BookPage < ApplicationRecord
  MAX_NEIGHBORS = 5

  has_neighbors :embedding

  def self.relevant_pages(embedding)
    nearest_neighbors(:embedding, embedding, distance: "inner_product").first(MAX_NEIGHBORS)
  end
end
