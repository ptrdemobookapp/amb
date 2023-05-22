class Api::QuestionsController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def create
    render json: {
      question: params[:question],
      answer: 'this is an example answer'
    }
  end

  def show

  end

  def random
    render json: {
      question: params[:question],
      answer: 'this is an example answer'
    }
  end
end
