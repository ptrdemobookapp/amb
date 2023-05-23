require 'tokenizers'
require 'pdf-reader'

class PDFImporter
  MIN_TOKENS = 10
  MAX_TOKENS = 8191

  def initialize(path)
    @path = path
  end

  def import
    reader.pages.each do |page|
      next if BookPage.exists?(number: page.number)

      text = page.text.squish
      next if text.blank?

      tokens_count = tokenizer.encode(text).tokens.count
      next if tokens_count > MAX_TOKENS || tokens_count < MIN_TOKENS

      BookPage.create!(
        number: page.number,
        content: text,
        tokens: tokens_count,
        embedding: OpenAIClient.fetch_embeddings(text).first
      )

      puts "Imported page #{page.number}, #{tokens_count} tokens, excerpt: #{text[0..50]}..."
    end
  end

  private

    def reader
      reader ||= PDF::Reader.new(@path)
    end

    def tokenizer
      @tokenizer ||= Tokenizers.from_pretrained("gpt2")
    end
end
