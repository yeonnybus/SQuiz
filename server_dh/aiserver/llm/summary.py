from .OpenAIClient import OpenAIClient
from .utils import *
import json

openai_client = OpenAIClient()
kc_df = KCList().df

# TODO 요약본 생성기 클래스로 만들기
def txt_format_for_summary(txt, page_kc_id):
    """
    pdf text를 요약본 생성기의 입력 포맷으로 변환하여 리턴

    :param txt: "<0>~~~<1>~~~" 포맷의 pdf text
    :param page_kc_id: KC 분류기 결과 - 페이지별 KC ID
    :return: 퀴즈 생성기 입력 포맷 문자열 (ex. <0>KC1: ~~~ <1>KC2:~~~)
    """
    pages = page_kc_id.keys()
    input_txt = ""

    for page_number in pages:
        input_txt += "<" + page_number + "> " + kc_df.loc[page_kc_id[page_number]]["운영체제 정의 "] + ": "
        input_txt += get_page_txt(txt, page_number)

    return input_txt


def get_schema_for_summary():
    tools_for_summary = [
        {
            "type": "function",
            "function": {
                "name": "get_summary",
                "description": "Provide summary of the given learning material in Markdown format.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "summary": {
                            "type": "string",
                            "description": "Summarized the given learning material in Markdown format. The summary should clearly illustrate the inclusion relationship to facilitate memorization and readability, and make appropriate use of bullet points. And summary is Korean. # Concept of Operating Systems - **Definition:** Operating "
                        },
                    },
                    "required": ["summary"],
                }
            }
        }
    ]

    return tools_for_summary


def summary_create_msg(params):
    """
    GPT API 호출할 때 필요한 message (프롬프트) 생성

    :param params: { pdftxt: str, subject: str }
    :return: message
    """

    subject = params["subject"]
    example_choice = ""

    # TODO : 요약본 예시 추가
    if subject == "OPERATING_SYSTEM":
        example_summary = (
            ""
        )

    sys_content_for_summary = (
            "You will receive the knowledge component (KC) and the contents of the corresponding learning materials."
            + "KC is a unit of learning concept. For example, in operating system subjects, process concepts, system calls, etc. can be KC. "
            + "You will summarize the given learning material in Markdown format for students studying operating system courses. "
            + "Summarize the entire content of the given course material. "
            + "Summary must be created based on the content of the study material."
            + "The summary should clearly illustrate the inclusion relationship to facilitate memorization and readability, and make appropriate use of bullet points. "
            + "kc and corresponding learning materials will be entered in the form of <page number>kc: learning material content, such as <0> Operating system definition: Operating system is ...., <14> Process concept: Process is, ...."
            + "Summarize the learning material and call the function get_summary. "
            + "Emphasize important content through techniques like bold formatting. "
            + "For example, "
            + "Keep in mind that you must write summary in Markdown format. "
    )

    user_content_for_summary = (
            "Summarize the following learning material for the operating system course in Korean. "
            + "Make it easy to memorize and be sure to format it nicely in Markdown. "
            + "Summarize the entire content of the given course material. "
            + "Emphasize important content through techniques like bold formatting. "
            + "Keep in mind that you must create Markdown format."
            + "[knowledge component and study material]: " + params["pdftxt"]
    )

    msg_for_choice = [
        {"role": "system", "content": sys_content_for_summary},
        {"role": "user", "content": user_content_for_summary}
    ]

    return msg_for_choice


def get_summary(params):

    page_kc_id = json.loads(params["pageKcId"])

    req = {"pdftxt": txt_format_for_summary(params["pdfText"], page_kc_id),
           "subject": params["subject"]}

    msg = summary_create_msg(req)
    # TODO "summary" 감싸 나오는 에러 해결하기
    summary = openai_client.get_summary(msg, get_schema_for_summary())

    gen_summary = {
        "pdfId": params["pdfId"],
        "summaryInMd": summary
    }

    # quiz id, type  추가 , jsonify
    return gen_summary
