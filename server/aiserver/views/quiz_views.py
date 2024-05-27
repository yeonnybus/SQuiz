from flask import Blueprint, jsonify, request
from http import HTTPStatus
from ..llm import quiz as quiz

quiz_bp = Blueprint('quiz', __name__, url_prefix='/quiz')


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
        gen_quiz = quiz.get_quiz(params)

        # TODO 에러 처리
        return jsonify(gen_quiz), HTTPStatus.OK

    except Exception as e:
        print(str(e))
        return jsonify(False), HTTPStatus.INTERNAL_SERVER_ERROR
