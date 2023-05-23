class Api::QuestionsController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def create
    result = FindOrCreateQuestion.call(question_params)

    if result.error
      render_error result.error, :unprocessable_entity
    else
      render json: result.question.as_json(only: [:id, :question, :answer, :audio_src_url])
    end
  end

  def show
    question = Question.find(params[:id])

    render json: question.as_json(only: [:id, :question, :answer, :audio_src_url])
  rescue ActiveRecord::RecordNotFound
    render_error "Question not found", :not_found
  end

  private

    def question_params
      params.require(:question).permit(:question)
    end

    def render_error(error, status)
      render json: { error: error }, status: status
    end
end
