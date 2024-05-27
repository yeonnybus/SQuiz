from .OpenAIClient import OpenAIClient
from .utils import *
from .choice_quiz import *
from .ox_quiz import *
from .blank_quiz import *
import json


# TODO 인스턴스 생성 한 번만 가능?
openai_client = OpenAIClient()
kc_df = KCList().df

# TODO 요약본 생성기 클래스로 만들기
def txt_format_for_quiz(txt, page_kc_id):
    """
    pdf text를 퀴즈 생성기의 입력 포맷으로 변환하여 리턴

    :param txt: "<0>~~~<1>~~~" 포맷의 pdf text
    :param page_kc_id: KC 분류기 결과 - 페이지별 KC ID
    :return: 퀴즈 생성기 입력 포맷 문자열 (ex. <KC1>: ~~~ <KC2>:~~~)
    """
    j = {}
    pages = page_kc_id.keys()

    for page_number in pages:
        kc_id = page_kc_id[page_number]
        if kc_id in j:
            j[kc_id] = j[kc_id] + " " + get_page_txt(txt, page_number)
        else:
            j[kc_id] = get_page_txt(txt, page_number)

    input_txt = ""

    kc_id_list = list(j.keys())

    for i in range(len(kc_id_list)):
        input_txt += "<" + str(kc_id_list[i]) + "> " + kc_df.loc[kc_id_list[i]]["운영체제 정의 "] + ": "
        input_txt += j[kc_id_list[i]] + "\n"

    return input_txt


def get_quiz(params):

    page_kc_id = json.loads(params["pageKcId"])

    req = {"pdftxt": txt_format_for_quiz(params["pdfText"], page_kc_id),
           "rank": str(params["rank"]),
           "problem_num": str(params["problemNum"]),
           "subject": params["subject"]}

    problem_list = []

    # 퀴즈 종류에 따라 퀴즈 생성
    if params["quizType"] == "MULTIPLE_CHOICE":
        problem_list = get_choice_quiz(req, openai_client)
    elif params["quizType"] == "OX":
        problem_list = get_ox_quiz(req, openai_client)
    elif params["quizType"] == "BLANK":
        problem_list = get_blank_quiz(req, openai_client)

    gen_quiz = {
        "quizId": params["quizId"],
        "quizType": params["quizType"],
        "problemList": problem_list,
    }

    # quiz id, type  추가 , jsonify
    return gen_quiz
