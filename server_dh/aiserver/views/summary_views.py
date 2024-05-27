from flask import Blueprint, request, jsonify
from http import HTTPStatus
from ..llm import summary

summary_bp = Blueprint('summary', __name__, url_prefix='/summary')


@summary_bp.route('/', methods=['POST'])
def create_summary():
    """
    요약본 생성 요청

    """
    params = request.get_json()
    gen_summary = summary.get_summary(params)

    # TODO 에러 처리
    return jsonify({"data": gen_summary, "status": HTTPStatus.OK})
