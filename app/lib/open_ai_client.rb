
class OpenAIClient
  class OpenAIError < StandardError; end

  # I've used the 2nd generation model instead of the 1st-gen 'curie' (listed as not recommended in the docs)
  EMBEDDINGS_MODEL = "text-embedding-ada-002".freeze

  def self.fetch_embeddings(input)
    client = OpenAI::Client.new
    response = client.embeddings(
      parameters: {
        model: EMBEDDINGS_MODEL,
        input: input
      }
    )

    if response["error"].present?
      raise OpenAIError, response["error"]["message"]
    end

    response["data"].map { |v| v["embedding"] }
  end
end
