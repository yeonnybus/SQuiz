import time
import json
from pdf2image import convert_from_bytes
import requests
import uuid
import time
import json
import tempfile
from .ComponentController import ComponentController
from decouple import config
from .utils import KCList
from .OpenAIClient import OpenAIClient

openai_client = OpenAIClient()
kclist = KCList()
component_controller = ComponentController()


class PdfUtility:
    def __init__(self):
        self.secret_key = config("OCR_SECRET_KEY")
        self.api_url = config("OCR_API_URL")

    # ocr 응답 받는 함수
    def naver_clova(self, image_file):

        request_json = {
            'images': [
                {
                    'format': 'jpg',
                    'name': 'demo'
                }
            ],
            'requestId': str(uuid.uuid4()),
            'version': 'V2',
            'timestamp': int(round(time.time() * 1000))
        }

        payload = {'message': json.dumps(request_json).encode('UTF-8')}
        files = [
            ('file', open(image_file, 'rb'))
        ]
        headers = {
            'X-OCR-SECRET': self.secret_key
        }

        response = requests.request("POST", self.api_url, headers=headers, data=payload, files=files)

        return response

    # pdf를 ocr한 결과 txt로 바꾸는 함수
    def pdf_to_text(self, pdf):
        pdf_text = ""
        images = convert_from_bytes(pdf.read(), fmt='jpg')

        for i, image in enumerate(images):
            # 임시 파일 생성
            with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as temp_file:
                image.save(temp_file.name, format="JPEG")
                temp_file_path = temp_file.name

            # OCR 요청
            res = self.naver_clova(temp_file_path)

            # OCR 응답 처리
            if res.status_code == 200:
                ocr_results = json.loads(res.text)
                all_texts = []  # 모든 텍스트를 저장할 리스트
                for image_result in ocr_results['images']:
                    for field in image_result['fields']:
                        text = field['inferText']
                        all_texts.append(text)  # 텍스트 추가

                # 모든 텍스트를 띄어쓰기로 연결하여 출력
                full_text = ' '.join(all_texts)
                pdf_text += "<" + str(i) + ">" + full_text + " "
                if (i + 1) % 5 == 0:
                    print(f'Page {i + 1} OCR complete')
            else:
                print(f"OCR 결과를 받아오지 못했습니다. 상태 코드: {res.status_code}")

        return pdf_text


class KCClassifier:

    def __init__(self):
        self.controller = component_controller
        self.kclist = kclist

    # kc분류기 프롬프팅 + 응답 결과 가져오기
    def kc_classifier(self, pdf_text, subject):
        start_idx, end_idx = kclist.get_kc_idx(str(subject))
        df = kclist.df[start_idx:end_idx][['kc_id', 'kc']]
        formatted_list = []

        for index, row in df.iterrows():
            formatted_list.append(f"{row['kc']} {index}    ")

        kc_list = ' '.join(formatted_list)
        kc_list = str(kc_list)

        tools = self.controller.get_schema_for_kc()
        msg = self.controller.get_msg_for_kc(pdf_text, kc_list)

        tool_calls = openai_client.get_kc(msg, tools)

        page_kc_list = {}

        for i in range(len(tool_calls)):
            temp = json.loads(tool_calls[i].function.arguments)
            page_kc_list[temp['page_number']] = temp['kc_id']

        page_kc_list_str = {str(key): value for key, value in sorted(page_kc_list.items(), key=lambda x: int(x[0]))}
        page_kc_list_str = json.dumps(page_kc_list_str)

        return page_kc_list_str
