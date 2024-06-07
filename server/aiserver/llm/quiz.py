from .OpenAIClient import OpenAIClient
from .utils import *
import json
from .ComponentController import ComponentController

# TODO 인스턴스 생성 한 번만 가능?
openai_client = OpenAIClient()
kc_df = KCList().df
component_controller = ComponentController()


# TODO 요약본 생성기 클래스로 만들기

class QuizGenerator:
    def __init__(self):
        self.client = openai_client
        self.kc_df = kc_df
        self.controller = component_controller


    def txt_format_for_quiz(self, txt, page_kc_id, start_page, end_page):
        """
        pdf text를 퀴즈 생성기의 입력 포맷으로 변환하여 리턴

        :param txt: "<0>~~~<1>~~~" 포맷의 pdf text
        :param page_kc_id: KC 분류기 결과 - 페이지별 KC ID
        :return: 퀴즈 생성기 입력 포맷 문자열 (ex. <KC1>: ~~~ <KC2>:~~~)
        """
        j = {}
        pages = list(page_kc_id.keys())
        end_page += 1  
        selected_pages = pages[start_page:end_page]
        for page_number in selected_pages:
            kc_id = page_kc_id[page_number]
            if kc_id in j:
                j[kc_id] += " " + get_page_txt(txt, page_number)
            else:
                j[kc_id] = get_page_txt(txt, page_number)

        input_txt = ""
        kc_id_list = list(j.keys())

        for kc_id in kc_id_list:
            input_txt += f"<{kc_id}> {self.kc_df.loc[kc_id]['kc']}: "
            input_txt += j[kc_id] + "\n"
            
        return input_txt

    def get_quiz(self, params):

        print(type(params["pageKcId"]))
        page_kc_id = json.loads(params["pageKcId"])

        req = {"pdftxt": self.txt_format_for_quiz(params["pdfText"], page_kc_id, params["startPage"], params["endPage"]),
               "rank": str(params["rank"]),
               "problem_num": str(params["problemNum"]),
               "subject": params["subject"]}

        problem_list = []

        # 퀴즈 종류에 따라 퀴즈 생성
        if params["quizType"] == "MULTIPLE_CHOICE":
            print("MULTIPLE_CHOICE")
            problem_list = self.get_choice_quiz(req)
        elif params["quizType"] == "OX":
            problem_list = self.get_ox_quiz(req)
        elif params["quizType"] == "BLANK":
            problem_list = self.get_blank_quiz(req)

        gen_quiz = {
            "quizId": params["quizId"],
            "quizType": params["quizType"],
            "problemList": problem_list,
        }

        # quiz id, type  추가 , jsonify
        return gen_quiz

    def get_choice_quiz(self, params):
        try:
            msg = self.controller.choice_quiz_create_msg(params)
            raw_quiz = self.client.get_quiz(msg, self.controller.get_schema_for_choice())

            choice_problem_list = []
            for i in range(len(raw_quiz)):
                prob = {
                    "problemNo": i + 1,
                    "kcId": raw_quiz[i]["kc_id"],
                    "question": raw_quiz[i]["question"],
                    "content": None,
                    "options": {
                        "option_a": raw_quiz[i]["options"]["option_a"],
                        "option_b": raw_quiz[i]["options"]["option_b"],
                        "option_c": raw_quiz[i]["options"]["option_c"],
                        "option_d": raw_quiz[i]["options"]["option_d"],
                    },
                    "answer": raw_quiz[i]["answer"],
                    "blanks": {
                        "blank_1": None,
                        "blank_2": None,
                        "blank_3": None,
                        "blank_4": None,
                    },
                    "explanation": raw_quiz[i]["explanation"],
                }
                choice_problem_list.append(prob)
            print("prob_list", choice_problem_list)
            print("len: ", len(choice_problem_list))
            return choice_problem_list

        except Exception as e:
            print(str(e))
            return str(e)

    def get_ox_quiz(self, params):
        msg = self.controller.ox_quiz_create_msg(params)
        raw_quiz = self.client.get_quiz(msg, self.controller.get_schema_for_ox())
        b = lambda x: "o" if x == True else "x"

        # postprocessing
        ox_problem_list = []
        for i in range(len(raw_quiz)):
            prob = {
                "problemNo": i + 1,
                "kcId": raw_quiz[i]["kc_id"],
                "question": raw_quiz[i]["question"],
                "content": None,
                "options": {
                    "option_a": None,
                    "option_b": None,
                    "option_c": None,
                    "option_d": None,
                },
                "answer": b(raw_quiz[i]["answer"]),
                "blanks": {
                    "blank_1": None,
                    "blank_2": None,
                    "blank_3": None,
                    "blank_4": None,
                },
                "explanation": raw_quiz[i]["explanation"],
            }
            ox_problem_list.append(prob)

        return ox_problem_list


    def get_blank_quiz(self, params):
        msg = self.controller.blank_quiz_create_msg(params)
        raw_quiz = self.client.get_quiz(msg, self.controller.get_schema_for_blank())

        # postprocessing
        blank_problem_list = []
        for i in range(len(raw_quiz)):
            prob = {
                "problemNo": i + 1,
                "kcId": raw_quiz[i]["kc_id"],
                "question": raw_quiz[i]["question"],
                "content": raw_quiz[i]["content"],
                "options": {
                    "option_a": None,
                    "option_b": None,
                    "option_c": None,
                    "option_d": None,
                },
                "answer": None,
                "blanks": {
                    "blank_1": raw_quiz[i]["blanks"]["blank_1"],
                    "blank_2": raw_quiz[i]["blanks"]["blank_2"],
                    "blank_3": raw_quiz[i]["blanks"]["blank_3"],
                    "blank_4": raw_quiz[i]["blanks"]["blank_4"],
                },
                "explanation": raw_quiz[i]["explanation"],
            }
            blank_problem_list.append(prob)

        return blank_problem_list

