
class OpenAIClient
  class OpenAIError < StandardError; end

  # I've used the 2nd generation model instead of the 1st-gen 'curie' (listed as not recommended in the docs)
  EMBEDDINGS_MODEL = "text-embedding-ada-002".freeze

  COMPLETIONS_MODEL = "text-davinci-003".freeze

  COMPLETIONS_API_PARAMS = {
    # We use temperature of 0.0 because it gives the most predictable, factual answer.
    temperature: 0.0,
    max_tokens: 150,
    model: COMPLETIONS_MODEL
  }.freeze

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

  def self.fetch_completions(prompt)
    client = OpenAI::Client.new
    response = client.completions(parameters: COMPLETIONS_API_PARAMS.merge(prompt: prompt))

    if response["error"].present?
      raise OpenAIError, response["error"]["message"]
    end

    response["choices"].first["text"].strip
  end
end
