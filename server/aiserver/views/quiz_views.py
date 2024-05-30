from flask import Blueprint, jsonify, request
from http import HTTPStatus
from ..llm import quiz as quiz
from ..llm.quiz import QuizGenerator

quiz_bp = Blueprint('quiz', __name__, url_prefix='/quiz')
quiz_generator = QuizGenerator()

@quiz_bp.route('', methods=['POST'])
def create_quiz():
    """
    퀴즈 생성 API
    :return: 생성된 퀴즈 목록
    """
    try:
        print("quiz, try")
        params = request.get_json()
        print(params)
        gen_quiz = quiz_generator.get_quiz(params)

        return jsonify(gen_quiz), HTTPStatus.OK

    except Exception as e:
        print(str(e))
        return jsonify(str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
