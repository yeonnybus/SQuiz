import time
import json
from pdf2image import convert_from_bytes
import requests
import uuid
import time
import json
import tempfile
import pandas as pd
from openai import OpenAI
from .utils import KCList
from decouple import config


# ocr 응답 받는 함수
def naver_clova(image_file):
    secret_key = "UVRvTXNwS2Fib2FEUW1hZGZDQnJCVEdhTm5pakxRVXU="
    api_url = "https://iyd4la9to1.apigw.ntruss.com/custom/v1/30929/d09b9cf497a5ab8b6876ca06f4916c22b06b1c6ba4c426e1adc91f72b7533f51/general"
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
        'X-OCR-SECRET': secret_key
    }

    response = requests.request("POST", api_url, headers=headers, data=payload, files=files)

    return response


# pdf를 ocr한 결과 txt로 바꾸는 함수
def pdf_to_text(pdf):
    pdf_text = ""
    images = convert_from_bytes(pdf.read(), fmt='jpg')

    for i, image in enumerate(images):
        # 임시 파일 생성
        with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as temp_file:
            image.save(temp_file.name, format="JPEG")
            temp_file_path = temp_file.name

        # OCR 요청
        res = naver_clova(temp_file_path)

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


# 과목에 따른 kc idx 정하는 함수
def get_kc_idx(subject):
    if subject == "OPERATING_SYSTEM":
        return 0, 93
    elif subject == "COMPUTER_COMMUNICATION":
        return 93, 249
    elif subject == "C_LANGUAGE":
        return 249, 324
    elif subject == "OBJECT_ORIENTED_PROGRAMMING":
        return 324, 435
    else:
        return 0, 0


# kc분류기 프롬프팅 + 응답 결과 가져오기
def kc_classifier(pdf_text, subject):
    start_idx, end_idx = get_kc_idx(str(subject))
    #df = pd.read_csv("C:\projects\myproject\KnowledgeComponent.csv")
    kc_df = KCList().df
    df = kc_df[start_idx:end_idx][['kc_id', 'kc']]
    formatted_list = []

    for index, row in df.iterrows():
        formatted_list.append(f"{row['kc']} {index}    ")

    kc_list = ' '.join(formatted_list)
    kc_list = str(kc_list)

    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_kc",
                "description": "Provide the knowledge component ID corresponding to the page",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "page_number": {
                            "type": "integer",
                            "description": "Page number, e.g. 1, 2",
                        },

                        "kc": {
                            "type": "string",
                            "description": "Knowlege component(KC) id corresponding to the page. KC represents a unit of learning concept. Write in Korean.",
                        },

                        "kc_id": {
                            "type": "integer",
                            "description": "Knowlege component(KC) id corresponding to the page. KC represents a unit of learning concept. For example, if the concept on page 3 is 'system calls' and if 'system calls' KC ID is 150, kc_id is 150."
                                           + "KCs and KC IDs will be provided in the format 'Operating System Definition 0     Operating System History 1     System calls 2', where Learning Concep and KC ID. "
                                           + "Then, 'Operating System Definition''s KC ID is 0, 'Operating System History''s KC ID is 1, 'System calls''s KC ID is 2, ",
                        }

                    },
                    "required": ["page_number", "kc_id", "kc"],
                }
            }
        }
    ]

    sys_content = (
                "Given a page of study material and its associated Knowledge Component (KC) as input, you will classify the KC corresponding to the study material. "
                + "KC represents a unit of learning concept. "
                + "For example, in the subject of operating systems, KCs could include concepts like concept of threads, system calls, batch system scheduling etc. "
                + "KCs are accompanied by an ID. "
                + "For instance, if the concept on page 3 of a PDF is 'system calls' and its KC ID is 150, you should classify the KC ID of page 3 as 150. "
                + "Then, you will use the classified KCs to call the get_kc function. "
                + "The material will have contents like '<1>', '<2>' followed by the content of that page. "
                + "KC IDs and KCs will be provided in the format 'Operating System Definition 1   Operating System History 2.   System calls 3', where Learning Concept and KC ID. "
                + "You will receive the content of N pages. "
                + "Do not classify KCs as those not included in the given KCs")
    user_content = ("Give me the Knowledge Component IDs for all pages. "
                    + "The material will have contents like '<1>', '<2>' followed by the content of that page. "
                    + "KCs and KC IDs will be provided in the format '1 Operating System Definition 2 Operating System History', where KC ID and Learning Concept. "
                    + " [study material] " + pdf_text
                    + " [Knowledge Component] " + kc_list)

    msg = [
        {"role": "system", "content": sys_content},
        {"role": "user", "content": user_content}
    ]

    client = OpenAI(api_key=config("OPENAI_API_KEY"))
    print("Receiving response from GPT...")
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=msg,
        tools=tools,
    )

    tool_calls = response.choices[0].message.tool_calls

    page_kc_list = {}

    for i in range(len(tool_calls)):
        temp = json.loads(tool_calls[i].function.arguments)
        page_kc_list[temp['page_number']] = temp['kc_id']

    page_kc_list_str = {str(key): value for key, value in sorted(page_kc_list.items(), key=lambda x: int(x[0]))}
    page_kc_list_str = json.dumps(page_kc_list_str)

    return page_kc_list_str