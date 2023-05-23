
class OpenAIClient
  MODEL_NAME = "curie".freeze
  DOC_EMBEDDINGS_MODEL = "text-search-#{MODEL_NAME}-doc-001".freeze
  QUERY_EMBEDDINGS_MODEL = "text-search-#{MODEL_NAME}-query-001".freeze

  def self.fetch_embeddings(input)
    client = OpenAI::Client.new
    response = client.embeddings(
      parameters: {
        model: DOC_EMBEDDINGS_MODEL,
        input: input
      }
    )
    response["data"].map { |v| v["embedding"] }
  end
end
