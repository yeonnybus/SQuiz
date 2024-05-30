from flask import Blueprint, jsonify, request
from ..llm.pdf_kc import KCClassifier, PdfUtility

pdf_bp = Blueprint('pdf', __name__, url_prefix='/pdf')
pdfUtility = PdfUtility()
kcClassifier = KCClassifier()

@pdf_bp.route('/kc', methods=['POST'])
def pdf_to_kc():
    print("try")
    try:
        pdf_id = request.form.get('pdfId')
        pdf = request.files['pdf']
        subject = request.form.get('subject')
        print("pdf/kc")

        pdf_text = pdfUtility.pdf_to_text(pdf)
        page_kc_id = kcClassifier.kc_classifier(pdf_text, subject)

        response = {
            "pdfId": int(pdf_id),
            "pdfText": pdf_text,
            "pageKcId": page_kc_id
        }

        return jsonify(response), 200

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500
