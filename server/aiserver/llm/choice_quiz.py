def choice_quiz_create_msg(params):
    """
    GPT API 호출할 때 필요한 message (프롬프트) 생성

    :param params: { pdftxt: str, rank: str, problem_num: str, subject: str }
    :return: message
    """

    subject = params["subject"]
    problem_num = params["problem_num"]
    rank = params["rank"]

    example_choice = ""

    # TODO 프롬프트 txt 리소스 따로 관리하기
    # TODO CC, OO, C 객관식 예제 추가
    if subject == "OPERATING_SYSTEM":
        example_choice = (
                "[example1] question: A process’ virtual address space contains the segments for code, heap, stack, data and BSS. When the program is loaded onto memory for execution, OS initializes the some of the segments with the contents loaded from the disk. Consider the following code. Among the five segments listed above, which segment is initialized with respect to the contents from the binary file? int a_array [1000] ; int b_array [1000] = 0 ; main(){ int first_integer ; static int second_integer ; //;;; } options: a: a_array, b: b_array, c: first_integer, d: second_integer answer: b"
                + "[example2] question: A currently running process has used up its time quantum. Then, the CPU scheduler schedules the next process from the queue of processes that are waiting to be executed. What is the state of process that has been running after it has used up its time quantum? options: a: RUNNING, b: READY, c: BLOCKED, d: SUSPENDED"
                + "[example3] question: A system that can only execute one program at a time is? options: a: hard wiring system, b: batch job system, 3: time sharing system, 4: real-time system answer: b"
                + "[example4] Question: Compared to non-preemptive scheduling, which statement about preemptive scheduling is incorrect? Options: a: It has a lower priority compared to non-preemptive scheduling. b: It can interrupt a running task and execute a new task. c: It has a lot of context switch overhead. d: It is used in time-sharing schedulers. Answer: b"
                + "[example5] Question: Which explanation about the four necessary conditions for deadlock is incorrect? Options: a: Mutual Exclusion: Deadlock occurs when the resources used by one process are exclusive and cannot be shared with other processes. b: Non-preemption: Deadlock occurs when a resource being used by one process is preempted by another process in the middle of its usage. c: Hold and Wait: Deadlock occurs when a process holds some resources and waits for other resources. d: Circular Wait: Deadlock occurs when the relationship of processes holding resources and waiting for others forms a circle, and none of the processes can proceed. Answer: b"
        )

    sys_content_for_choice = (
            "You will receive the knowledge component (KC) and the contents of the corresponding learning materials."
            "KC is a unit of learning concept. For example, in operating system subjects, process concepts, "
            "system calls, etc. can be KC."
            "You will create " + problem_num + "multiple-choice quiz for a student studying operating systems. "
            "Create a question and four options: a, b, c, and d."
            "Select one KC among the given KCs and create a problem to check the concept."
            "Problems must be created based on the content of the study material corresponding to the selected KC."
            "kc and corresponding learning materials will be entered in the form of <kc ID>kc: learning material "
            "content, such as <0> Operating system definition: Operating system is ...., <14> Process concept: "
            "Process is, ... ."
            "Create a problem and call the get_problem function. "
            "Do not classify or select KCs as those not included in the given KCs. "
            "You must create " + problem_num + "problems."
            "Keep in mind that you must create problems according to the given number of problems. "
    )

    user_content_for_choice = (
            "Create " + problem_num + "multiple-choice, four-choice problems for learning operating systems. "
            + "If you give me a learning concept and corresponding learning materials, select a learning concept from "
              "among them and create a problem based on the data."
            + "Choose one kc for each problem. And make all the problems in Korean."
            + "You have to make " + problem_num + "problems. "
            + "Keep in mind that you must create problems according to the given number of problems."
            + "[knowledge component and study material]: " + params["pdftxt"]
            + "Create " + problem_num + "multiple-choice problems."
    )

    msg_for_choice = [
        {"role": "system", "content": sys_content_for_choice + example_choice},
        {"role": "user", "content": user_content_for_choice}
    ]

    return msg_for_choice


def get_schema_for_choice():
    tools_for_choice = [
        {
            "type": "function",
            "function": {
                "name": "get_problem",
                "description": "Provide the multiple-choice question and answer.",
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
                            "description": "Knowlege component(KC) corresponding to the question. KC represents a unit of learning concept. Write in Korean.",
                        },
                        "question": {
                            "type": "string",
                            "description": "The question of the quiz."
                        },
                        "options": {
                            "type": "object",
                            "properties": {
                                "option_a": {
                                    "type": "string",
                                    "description": "The OPTION A of the question"
                                },
                                "option_b": {
                                    "type": "string",
                                    "description": "The OPTION B of the question"
                                },
                                "option_c": {
                                    "type": "string",
                                    "description": "The OPTION C of the question"
                                },
                                "option_d": {
                                    "type": "string",
                                    "description": "The OPTION D of the question"
                                },
                            },
                            "required": ["option_a", "option_b", "option_c", "option_d"]
                        },
                        "answer": {
                            "type": "string",
                            "enum": ['a', 'b', 'c', 'd'],
                            "description": "The single letter of the CORRECT OPTION of the question."
                        },
                        "explanation": {
                            "type": "string",
                            "description": "The explanation about the quiz with up to 400 characters."
                        },
                    },
                    "required": ["prob_type", "kc", "question", "options", "answer", "explanation"],
                }
            }
        }
    ]

    return tools_for_choice


def get_choice_quiz(params, client):
    try:
        msg = choice_quiz_create_msg(params)
        raw_quiz = client.get_quiz(msg, get_schema_for_choice())

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


