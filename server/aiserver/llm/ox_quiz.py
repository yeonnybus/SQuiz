def ox_quiz_create_msg(params):
    """
    GPT API 호출할 때 필요한 message (프롬프트) 생성

    :param params: { pdftxt: str, rank: str, problem_num: str, subject: str }
    :return: message
    """

    subject = params["subject"]
    problem_num = params["problem_num"]
    rank = params["rank"]

    example_ox = ""

    # TODO CC, OO, C OX 예제 추가
    if subject == "OPERATING_SYSTEM":
        example_ox = (
                "[example1] question: 배열을 원소를 초기화하지 않고 선언만 해도 컴파일 시점에 초기화된다. answer: false"
                "[example2] question: A process has requested an IO to read a disk page from the storage device. The process is waiting for the completion of an IO. The disk has transferred the requested page from the disk to the host’s memory. After the IO request completes, the state of process that has been waiting for the IO completion is BLOCK."
                "[example3] question: batch job system은 한 번에 여러 프로그램을 실행할 수 있다. answer: false"
                "[example4] question: You can mitigate starvation through aging. answer: true. "
                "[example5] question: 스냅숏은 데이터베이스나 운영체제 시스템에서 에러가 발생하여 특정 지점으로 돌아가는 행위를 가리킨다. answer: false."
        )

    sys_content_for_ox = (
            "You will receive the knowledge component (KC) and the contents of the corresponding learning materials."
            "KC is a unit of learning concept. For example, in operating system subjects, process concepts, "
            "system calls, etc. can be KC."
            "Create true/false questions for studying operating systems. Answers should be either 'true' or 'false'. "
            "Select one KC among the given KCs and create a problem to check the concept."
            "Problems must be created based on the content of the study material corresponding to the selected KC."
            "kc and corresponding learning materials will be entered in the form of <kc ID>kc: learning material "
            "content, such as <0> Operating system definition: Operating system is ...., <14> Process concept: "
            "Process is, ... ."
            "Create a problem and call the get_problem function."
            "Do not classify or select KCs as those not included in the given KCs."
            "You must create " + problem_num + "problems."
            "Keep in mind that you must create " + problem_num + "problems."
    )

    user_content_for_ox = (
            "Create " + problem_num + "true/false problems for learning operating systems. "
            "If I give you a learning concept and corresponding learning materials, select a learning concept from "
            "among them and create a problem based on the data."
            "Choose one kc for each problem. And make all the problems in Korean."
            "You have to make " + problem_num + "problems. "
            "Keep in mind that you must create problems according to the given number of problems."
            "[knowledge component and study material]: " + params["pdftxt"] +
            "Create " + problem_num + "true/false problems."
)

    msg_for_ox = [
        {"role": "system", "content": sys_content_for_ox + example_ox},
        {"role": "user", "content": user_content_for_ox}
    ]

    return msg_for_ox


def get_schema_for_ox():
    tools_for_ox = [
        {
            "type": "function",
            "function": {
                "name": "get_problem",
                "description": "Provide the question and answer.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "prob_type": {
                            "type": "string",
                            "enum": ["BLANK", "MULTIPLE_CHOICE", "OX"],
                            "description": "The type of problem"
                        },
                        "kc_id": {
                            "type": "integer",
                            "description": "Knowlege component(KC) id corresponding to the page. KC represents a unit of learning concept.",
                        },
                        "kc": {
                            "type": "string",
                            "description": "Knowlege component(KC) corresponding to the page. KC represents a unit of learning concept. Write in Korean.",
                        },
                        "question": {
                            "type": "string",
                            "description": "The question of quiz. It should be in the form of a proposition that can be evaluated as true or false. "
                        },
                        "answer": {
                            "type": "boolean",
                            "description": "The answer to the question, true or false"
                        },
                        "explanation": {
                            "type": "string",
                            "description": "The explanation about the quiz with up to 400 characters."
                        },
                    },
                    "required": ["prob_type", "kc", "question", "answer", "explanation"],
                }
            }
        }
    ]

    return tools_for_ox


def get_ox_quiz(params, client):
    msg = ox_quiz_create_msg(params)
    raw_quiz = client.get_quiz(msg, get_schema_for_ox())
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
