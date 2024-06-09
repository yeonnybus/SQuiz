from flask import Blueprint, jsonify, request
from ..dkt import utils_dkt
from ..dkt.utils_dkt import  DKTUtility

dkt_bp = Blueprint('dkt', __name__, url_prefix='/dkt')
dkt_utils = DKTUtility()

@dkt_bp.route('', methods=['POST'])
def dkt():
    try:
        print("try, dkt")
        mem_id = request.get_json().get('memberId')
        subject = request.get_json().get('subject')
        interactions = request.get_json().get('interactions')
        dkt_res = dkt_utils.dkt_model(mem_id, subject, interactions)

        response = {
            "memberId": mem_id,
            "subject": subject,
            "dkt": dkt_res
        }
        print("DKT 완료")
        return jsonify(response), 200

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500
