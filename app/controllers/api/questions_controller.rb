class Api::QuestionsController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def create
    question = FindOrCreateQuestion.call(question_params)

    if question.persisted?
      render json: question.as_json(only: [:id, :question, :answer])
    else
      render_error question.errors, :unprocessable_entity
    end
  end

  def show
    question = Question.find(params[:id])

    render json: question.as_json(only: [:id, :question, :answer])
  end

  private

    def question_params
      params.require(:question).permit(:question)
    end

    def render_error(errors, status)
      render json: { errors: errors }, status: status
    end
end
