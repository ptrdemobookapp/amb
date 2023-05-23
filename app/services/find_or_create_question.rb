class FindOrCreateQuestion < ApplicationService
  def initialize(params)
    @question_string = params[:question].squish
    @question_string = @question_string + '?' unless @question_string.end_with?('?')
  end

  def call
    slug = @question_string.parameterize

    existing_question = Question.find_by(slug: slug)
    if existing_question
      existing_question.bump_ask_count
      return existing_question
    end

    embedding = OpenAIClient.fetch_embeddings(@question_string).first
    relevant_pages = BookPage.relevant_pages(embedding)
    answer = AnswerQuestion.call(question: @question_string, relevant_pages: relevant_pages)
    audio_src_url = nil # ResembleClient.create_clip(@question_string)]

    Rails.logger.ap relevant_pages.map(&:content)

    question = Question.new(question: @question_string, slug: slug, answer: answer, embedding: embedding, audio_src_url: audio_src_url)
    question.save
    question
  end
end
