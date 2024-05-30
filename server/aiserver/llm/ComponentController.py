

class ComponentController:

    def choice_quiz_create_msg(self, params):
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

    def ox_quiz_create_msg(self, params):
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
                                                                              "[knowledge component and study material]: " +
                params["pdftxt"] +
                "Create " + problem_num + "true/false problems."
        )

        msg_for_ox = [
            {"role": "system", "content": sys_content_for_ox + example_ox},
            {"role": "user", "content": user_content_for_ox}
        ]

        return msg_for_ox

    def blank_quiz_create_msg(self, params):
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
                                                                                                                  "[knowledge component and study material]: " +
                params["pdftxt"] +
                "Create " + problem_num + "fill-in-blank problems."
        )

        msg_for_blank = [
            {"role": "system", "content": sys_content_for_blank + example_blank},
            {"role": "user", "content": user_content_for_blank}
        ]

        return msg_for_blank

    def summary_create_msg(self, params):
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

        msg_for_summary = [
            {"role": "system", "content": sys_content_for_summary},
            {"role": "user", "content": user_content_for_summary}
        ]

        return msg_for_summary

    def get_msg_for_kc(self, pdftxt, kc_list):
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
                + "Do not classify KCs as those not included in the given KCs."
                + "You have to keep in mind that you must classify the KC NOT NULL.")

        user_content = ("Give me the Knowledge Component IDs for all pages. "
                        + "The material will have contents like '<1>', '<2>' followed by the content of that page. "
                        + "KCs and KC IDs will be provided in the format '1 Operating System Definition 2 Operating System History', where KC ID and Learning Concept. "
                        + " [study material] " + pdftxt
                        + " [Knowledge Component] " + kc_list)

        msg = [
            {"role": "system", "content": sys_content},
            {"role": "user", "content": user_content}
        ]

        return msg

    def get_schema_for_choice(self):
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

    def get_schema_for_ox(self):
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

    def get_schema_for_blank(self):
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

    def get_schema_for_summary(self):
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


    def get_schema_for_kc(self):
        tools_for_kc = [
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
                                               + "Then, 'Operating System Definition''s KC ID is 0, 'Operating System History''s KC ID is 1, 'System calls''s KC ID is 2, NOT NULL.",
                            }

                        },
                        "required": ["page_number", "kc_id", "kc"],
                    }
                }
            }
        ]
        return tools_for_kc
