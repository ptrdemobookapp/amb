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

    embeddings = OpenAIClient.fetch_embeddings(@question_string)

    question = Question.new(question: @question_string, slug: slug, answer: 'placeholder answer', embedding: embeddings.first)
    question.save
    question
  end

  private


end
