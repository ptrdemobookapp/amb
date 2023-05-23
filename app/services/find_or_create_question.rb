class FindOrCreateQuestion < ApplicationService
  Result = Struct.new(:question, :error) do
    def initialize(question: nil, error: nil)
      super(question, error)
    end
  end

  def initialize(params)
    @question_string = format_question_string(params[:question])
    @slug = @question_string.parameterize
  end

  def call
    return Result.new(error: "No question provided") if @question_string.blank?

    existing_question = find_existing_question
    return existing_question if existing_question.present?

    create_new_question
  end

  private

    def format_question_string(question)
      question_string = question.squish
      question_string = question_string + '?' if question_string.present? && !question_string.end_with?('?')
      question_string
    end

    def find_existing_question
      existing_question = Question.find_by(slug: @slug)

      if existing_question
        existing_question.bump_ask_count
        return Result.new(question: existing_question)
      end

      nil
    end

    def create_new_question
      embedding = OpenAIClient.fetch_embeddings(@question_string).first
      relevant_pages = BookPage.relevant_pages(embedding)
      answer = AnswerQuestion.call(question: @question_string, relevant_pages: relevant_pages)
      audio_src_url = nil # ResembleClient.create_clip(@question_string)]

      Rails.logger.ap relevant_pages.map(&:content)

      question = Question.new(question: @question_string, slug: @slug, answer: answer, embedding: embedding, audio_src_url: audio_src_url)

      if question.save
        Result.new(question: question)
      else
        Result.new(error: question.errors.full_messages.join(", "))
      end
    rescue OpenAIClient::OpenAIError => e
      Result.new(error: "OpenAI API error: #{e.message}")
    end
end
