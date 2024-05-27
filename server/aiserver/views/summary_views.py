from flask import Blueprint, request, jsonify
from http import HTTPStatus
from ..llm import summary

summary_bp = Blueprint('summary', __name__, url_prefix='/summary')


@summary_bp.route('', methods=['POST'])
def create_summary():
    """
    요약본 생성 요청

    """
    try:
        params = request.get_json()
        gen_summary = summary.get_summary(params)

        # TODO 에러 처리
        return jsonify(gen_summary),  HTTPStatus.OK

    except Exception as e:
        print(str(e))
        return jsonify(None),  HTTPStatus.INTERNAL_SERVER_ERROR
