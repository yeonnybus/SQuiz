from flask import Blueprint, jsonify, request
from ..dkt import utils_dkt
from ..dkt.utils_dkt import  DKTUtility

dkt_bp = Blueprint('dkt', __name__, url_prefix='/dkt')
dkt_utils = DKTUtility()

@dkt_bp.route('', methods=['POST'])
def dkt():
    try:
        print(10)
        mem_id = request.get_json().get('memberId')
        print(12)
        subject = request.get_json().get('subject')
        print(14)
        interactions = request.get_json().get('interactions')
        print(16)
        dkt_res = dkt_utils.dkt_model(subject, interactions)

        response = {
            "memberId": mem_id,
            "subject": subject,
            "dkt": dkt_res
        }
        return jsonify(response), 200

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500
