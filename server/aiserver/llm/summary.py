from .OpenAIClient import OpenAIClient
from .utils import *
import json
from .ComponentController import ComponentController

openai_client = OpenAIClient()
kc_df = KCList().df
component_controller = ComponentController()

class SummaryGenerator:

    def __init__(self):
        self.client = openai_client
        self.kc_df = kc_df
        self.controller = component_controller

    def txt_format_for_summary(self, txt, page_kc_id):
        """
        pdf text를 요약본 생성기의 입력 포맷으로 변환하여 리턴

        :param txt: "<0>~~~<1>~~~" 포맷의 pdf text
        :param page_kc_id: KC 분류기 결과 - 페이지별 KC ID
        :return: 퀴즈 생성기 입력 포맷 문자열 (ex. <0>KC1: ~~~ <1>KC2:~~~)
        """
        pages = page_kc_id.keys()
        input_txt = ""

        for page_number in pages:
            print(page_number)
            print("kc: ", kc_df.loc[page_kc_id[page_number]]["kc"])
            input_txt += "<" + page_number + "> " + kc_df.loc[page_kc_id[page_number]]["kc"] + ": "
            input_txt += get_page_txt(txt, page_number)

        print("input:  ", input_txt)
        return input_txt


    def get_summary(self, params):
        try:
            print("101")
            page_kc_id = json.loads(params["pageKcId"])
            print("103")
            req = {"pdftxt": self.txt_format_for_summary(params["pdfText"], page_kc_id),
                   "subject": params["subject"]}
            msg = self.controller.summary_create_msg(req)
            summary = openai_client.get_summary(msg, self.controller.get_schema_for_summary())

            gen_summary = {
                "pdfId": params["pdfId"],
                "summaryInMd": summary
            }

            return gen_summary

        except Exception as e:
            print(str(e))
            return str(e)







