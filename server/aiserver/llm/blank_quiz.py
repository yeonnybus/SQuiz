def blank_quiz_create_msg(params):
    """
    GPT API 호출할 때 필요한 message (프롬프트) 생성

    :param params: { pdftxt: str, rank: str, problem_num: str, subject: str }
    :return: message
    """

    subject = params["subject"]
    problem_num = params["problem_num"]
    rank = params["rank"]

    example_blank = ""

    # TODO CC, OO, 빈칸 예제 추가
    if subject == "OPERATING_SYSTEM":
        example_blank = (
                "[example1]  question: A process’ virtual address space contains the segments for code, heap, stack, "
                "data and BSS."
                "When the program is loaded onto memory for execution, OS initializes the some of the segments with "
                "the contents loaded from the disk."
                "Consider the following code. "
                "There are four variable declarations in the code above. They are numbered from (1) to (4). "
                "Specify the segment where each of these variables resides."
                "content:int a_array [1000] ; //—(1) int b_array [1000] = 0 ; // —(2) main(){ int first_integer ; // "
                "—(3) static int second_integer ;// —(4)//; }"
                
                "[example2] question: A process can have one of the three states: RUNNING, READY and BLOCKED. Please "
                "fill in the blank to the following."
                "content: What is the state of the process that is currently being executed by CPU?"
                "The state of the process that is currently being executed by CPU is ___ (1) ___."
                "A process that has been running is now waiting for the user input. "
                "The state of process when the process is waiting for the user input is ___ (2) ___."
                "You must create 10 problems. "
                
                "[example3] question: Fill in the blanks."
                "content: A system that can only execute one program at a time is ___ (1) ___."
                "A system that divides CPU time finely to make it appear that multiple programs are running "
                "simultaneously is ___ (2) ___."
                "blanks: blank_1: batch job system, blank_2: time sharing system"
                
                "[example4] question: Fill in the blank."
                "content: ___ (1) ___ is a kernel that provides only the most basic functions such as process "
                "management, memory management, and inter-process communication management."
                "blank_1: microkernel"
                
                "[example5] question: The following are descriptions of scheduling algorithms. Fill in the blanks "
                "with appropriate answers."
                "content: The non-preemptive scheduling algorithm that assigns the CPU in the order in which "
                "processes arrive in the ready queue is ___ (1) ___."
                "The non-preemptive scheduling algorithm that assigns the CPU to the job with the shortest execution "
                "time among the processes in the ready queue is ___ (2) ___."
                "blanks: blank_1: Highest Response Ratio Next (HRRN), blank_2: Shortest Job First (SJF)"
        )

    sys_content_for_blank = (
            "You will receive the knowledge component (KC) and the contents of the corresponding learning materials."
            "KC is a unit of learning concept. For example, in operating system subjects, process concepts, "
            "system calls, etc. can be KC."
            "Create fill-in-the-blank questions for studying operating systems. "
            "The number of blanks should be minimum one and maximum four."
            "Create content consisting of learning concepts or programming code, and create blanks in the content. "
            "Blanks should be in the format of ___(1)___, ___(2)___, including IDs, starting from the first blank. "
            "Keep in mind to create the blanks sequentially starting from number 1. "
            "Place three underscores before and after the blanks. "
            "Select one KC among the given KCs and create a problem to check the concept."
            "Problems must be created based on the content of the study material corresponding to the selected KC."
            "kc and corresponding learning materials will be entered in the form of <kc ID>kc: learning material "
            "content, such as <0> Operating system definition: Operating system is ...., <14> Process concept: "
            "Process is, ... ."
            "Create a problem and call the get_problem function."
            "Do not classify or select KCs as those not included in the given KCs."
            "You must create " + problem_num + "problems. "
            "Keep in mind that you must create problems according to the given number of problems."
    )

    user_content_for_blank = (
            "Create " + problem_num + "fill-in-blank problems for learning operating systems. "
            "If you give me a learning concept and corresponding learning materials, select a learning concept from "
            "among them and create a problem based on the data."
            "Choose one kc for each problem. And make all the problems in Korean."
            "You have to make " + problem_num + "problems. "
            "Please make the problem " + rank + "level advanced. "
            "Keep in mind that you must create problems according to the given number of problems."
            "[knowledge component and study material]: " + params["pdftxt"] +
            "Create " + problem_num + "fill-in-blank problems."
    )

    msg_for_blank = [
        {"role": "system", "content": sys_content_for_blank + example_blank},
        {"role": "user", "content": user_content_for_blank}
    ]

    return msg_for_blank


def get_schema_for_blank():
    tools_for_blank = [
        {
            "type": "function",
            "function": {
                "name": "get_problem",
                "description": "Provide the question and content.",  # blank 내용 추가
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
                            "description": "Provide a brief description of the content and instruct to fill in the blanks. e.g. For example, the following is code for process creation. Fill in the blanks."
                        },
                        "content": {
                            "type": "string",
                            "description": "Content with blanks. The number of blanks should be between 1 and 4. Blanks should be indicated with IDs in the format of ___(1)___, ___(2)___. Place three underscores before and after the blanks. IDs are assigned in order starting from 0, 1, 2, and so forth. The content can be an explanation of a concept or it can be programming code. Blanks should be created to verify understanding of important concepts. For example, to open a file, one would use the system call like ___(1)___."
                        },
                        "blanks": {
                            "type": "object",
                            "properties": {
                                "blank_1": {
                                    "type": "string",
                                    "description": "The answer to the first blank."
                                },
                                "blank_2": {
                                    "type": "string",
                                    "description": "The answer to the second blank. If the second blank is empty, fill it with 'none'."
                                },
                                "blank_3": {
                                    "type": "string",
                                    "description": "The answer to the third blank. If the third blank is empty, fill it with 'none'."
                                },
                                "blank_4": {
                                    "type": "string",
                                    "description": "The answer to the fourth blank. If the fourth blank is empty, fill it with 'none'."
                                },
                            },
                            "required": ["blank_1", "blank_2", "blank_3", "blank_4"]
                        },
                        "explanation": {
                            "type": "string",
                            "description": "The explanation about the quiz with up to 400 characters."
                        },
                    },
                    "required": ["prob_type", "kc", "question", "content", "blanks", "explanation"],
                }
            }
        },
    ]

    return tools_for_blank


def get_blank_quiz(params, client):
    msg = blank_quiz_create_msg(params)
    raw_quiz = client.get_quiz(msg, get_schema_for_blank())

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
