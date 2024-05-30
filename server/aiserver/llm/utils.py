import pandas as pd


class KCList:
    def __init__(self):
        self.df = pd.read_csv("aiserver/data/KnowledgeComponent.csv")

    # 과목에 따른 kc idx 정하는 함수
    def get_kc_idx(self, subject):
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


def get_page_txt(txt, page):
    """
    입력된 pdf text 중 특정 페이지에 해당하는 문자열을 반환

    :param txt: "<0>~~<1>~~" 포맷의 pdf text
    :param page: str, page No
    :return: 해당 페이지의 문자열
    """
    if "<" + str(page) + ">" in txt:
        start = txt.index("<" + page + ">")
    else:
        start = 0

    if "<" + str(int(page) + 1) + ">" in txt:
        end = txt.index("<" + str(int(page) + 1) + ">")
    else:
        end = len(txt)
    start += len(page) + 2

    return txt[start:end]

