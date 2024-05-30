from flask import Blueprint, request, jsonify
from http import HTTPStatus
from ..llm import summary
from ..llm.summary import SummaryGenerator

summary_bp = Blueprint('summary', __name__, url_prefix='/summary')
summary_generator = SummaryGenerator()

@summary_bp.route('', methods=['POST'])
def create_summary():
    """
    요약본 생성 요청

    """
    try:
        params = request.get_json()
        print("params", params)
        gen_summary = summary_generator.get_summary(params)
        print("gen_summary", gen_summary)

        return jsonify(gen_summary),  HTTPStatus.OK

    except Exception as e:
        print(str(e))
        return jsonify(str(e)),  HTTPStatus.INTERNAL_SERVER_ERROR
