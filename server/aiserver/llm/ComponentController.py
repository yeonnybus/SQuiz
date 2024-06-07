

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
        # TODO CC, OO, 객관식 예제 추가
        if subject == "OPERATING_SYSTEM":
            example_choice = (
                "[example1] question: A process’ virtual address space contains the segments for code, heap, stack, data and BSS. When the program is loaded onto memory for execution, OS initializes the some of the segments with the contents loaded from the disk. Consider the following code. Among the five segments listed above, which segment is initialized with respect to the contents from the binary file? int a_array [1000] ; int b_array [1000] = 0 ; main(){ int first_integer ; static int second_integer ; //;;; } options: a: a_array, b: b_array, c: first_integer, d: second_integer answer: b"
                + "[example2] question: A currently running process has used up its time quantum. Then, the CPU scheduler schedules the next process from the queue of processes that are waiting to be executed. What is the state of process that has been running after it has used up its time quantum? options: a: RUNNING, b: READY, c: BLOCKED, d: SUSPENDED"
                + "[example3] question: A system that can only execute one program at a time is? options: a: hard wiring system, b: batch job system, 3: time sharing system, 4: real-time system answer: b"
                + "[example4] Question: Compared to non-preemptive scheduling, which statement about preemptive scheduling is incorrect? Options: a: It has a lower priority compared to non-preemptive scheduling. b: It can interrupt a running task and execute a new task. c: It has a lot of context switch overhead. d: It is used in time-sharing schedulers. Answer: b"
                + "[example5] Question: Which explanation about the four necessary conditions for deadlock is incorrect? Options: a: Mutual Exclusion: Deadlock occurs when the resources used by one process are exclusive and cannot be shared with other processes. b: Non-preemption: Deadlock occurs when a resource being used by one process is preempted by another process in the middle of its usage. c: Hold and Wait: Deadlock occurs when a process holds some resources and waits for other resources. d: Circular Wait: Deadlock occurs when the relationship of processes holding resources and waiting for others forms a circle, and none of the processes can proceed. Answer: b"
            )
        elif subject == "C_LANGUAGE":
            example_choice = "[Example1] KC: 운영체제의 메모리 관리 방법, Question: 운영체제에 따라 포인터 변수의 크기는 고정됩니다. 32비트 운영체제에서 포인터 변수의 크는 얼마인가?, A: 2byte, B:4byte, C:8byte, D:16byte, Answer: B "\
                             "[Example2] KC: 2진수를 16진수로 변환하는 방법, Question: 2진수 0000 0000 1000 1110을 16진수로 나타내면 무엇인가?, A: 0x008E, B: 0x00E7, C: 0x007D, D: 0x008D, Anser: A "\
                             "[Example3] KC: 비트 연산자, Question: 0000 1111과 0011 1100을 XOR 계산한 결과는 무엇인가?, A: 0011 0011, B: 0011 1100, C: 1100 1100, D: 1100 0000, Answer: A "\
                             "[Example4] KC: extern 키워드, Question: 같은 프로젝트 안에 존재하는 전역 변수를 참조하겠다는 의미를 가진 키워드는 무엇인가?, A: static, B: extern, C:const, D: private, Answer: B "\
                             "[Example5] KC:배열 시작 주소, Question: char data[4]; char p = &*data[0];일때 의미가 다른 표현은 무엇인가?, A: data, B: &*(data+0), C:&data, D:&(*data), Answer:C"

        elif subject == "OBJECT_ORIENTED_PROGRAMMING":
            example_choice = "[Example1] KC:자바프로그램 구성 요소 Question:다음 중에서 올바른 주석이 아닌 것을 고르시오. A:/** 주석 */ B:/* 주석 */ C:/* 주석 D:// 주석 Answer:C "\
                             "[Example2] KC:배치 관리자 Question:컨테이너의 영역을 동서남북, 중앙의 5개 영역으로 구분하여 컴포넌트를 배치하는 배치관리자는 무엇인가? A:FlowLayout B:BorderLayout C:GridLayout D:CardLayout Answer:B "\
                             "[Example3] KC:이벤트 처리 방법 Question:버튼을 누르면 발생하는 이벤트는 무엇인가? A:ActionEvent B:MouseEvent C:ItemEvent D:KeyEvent Answer:A "\
                             "[Example4] KC:이벤트 처리 개요 Question:다음 중 액션 이벤트를 발생시키지 않는 위젯은 무엇인가? A:버튼 B:메뉴 항목 C:텍스트 필드 D:스크롤바 Answer:D "\
                             "[Example5] KC:배치 관리자 Question:컨테이너 p의 배치관리자를 제거하려면 어떻게 하여야 하는가? A:p.setLayout(); B:p.setLayout(0); C:p.setLayout(null); D:p.setLayout(false); Answer:C"

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

        # TODO CC, OO, OX 예제 추가
        if subject == "OPERATING_SYSTEM":
            example_ox = "[example1] question: 배열을 원소를 초기화하지 않고 선언만 해도 컴파일 시점에 초기화된다. answer: false" \
                        "[example2] question: A process has requested an IO to read a disk page from the storage device. The process is waiting for the completion of an IO. The disk has transferred the requested page from the disk to the host’s memory. After the IO request completes, the state of process that has been waiting for the IO completion is BLOCK."\
                        "[example3] question: batch job system은 한 번에 여러 프로그램을 실행할 수 있다. answer: false"\
                        "[example4] question: You can mitigate starvation through aging. answer: true. "\
                        "[example5] question: 스냅숏은 데이터베이스나 운영체제 시스템에서 에러가 발생하여 특정 지점으로 돌아가는 행위를 가리킨다. answer: false."
        elif subject == "C_LANGUAGE":
            example_ox = "[Example1] KC: 포인터 변수의 주소 연산, Question: int *형으로 선언한 포인터 p 변수에 200번지가 저장되어있다. p++; 명령을 수행하고 나면 p에 저장된 주소는 201번지이다. Answer:X "\
                         "[Example2] KC: 동적 메모리 할당 및 해제, Question: p에 할당된 메모리를 해제할 때는 free(p)를 하면 된다. Answer: O "\
                         "[Example3] KC: 2진수를 16진수로 변환하는 방법, Question: 16진수 0x1C6A는 2진수 0001 1100 0110 1010으로 나타낼 수 있다., Answer: O "\
                         "[Example4] KC: 컴퓨터의 자료 기억 방식, Question: 운영체제는 메모리에 비트 단위로 주소를 부여해 관리한다., Answer: X "\
                         "[Example5] KC: 전처리기, Qustion: 프로그래머가 원하는 사항을 컴파일러에 직접 지시하는 문법을 기계어라고 한다., Answer: X"

        elif subject == "COMPUTER_COMMUNICATION":
            example_ox = ""

        elif subject == "OBJECT_ORIENTED_PROGRAMMING":
            example_ox = "[Example1] KC: 클래스와 객체 만들기 Question: 하나의 자바 파일에 2개의 public 클래스를 넣을 수 있는가? Answer:X "\
                         "[Example2] KC: 생성자와 메소드 오버로딩 Question:생성자에서 다른 메소드를 호출할 수 있는가? Answer:O "\
                         "[Example3] KC: 생성자와 메소드 오버로딩 Question: 생성자를 사용하지 않고 인스턴스 변수들을 초기화할 수 있는가? Answer: O "\
                         "[Example4] KC: 자바 GUI 소개 Question: 운영체제에 따라서 GUI 컴포넌트의 모양이 달라지는 것은 스윙이 아닌 AWT이다. Answer: O "\
                         "[Example5] KC: 컨테이너 살펴보기 Question:패널은 최상위 컨테이너인가? Answer:X"

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

        elif subject == "C_LANGUAGE":
            example_blank = "[Example1] KC: if 조건문, Question: result 변수의 값이 음수이면 양수로 변경하는 예제를 만들고자 한다. 빈칸에 들어갈 코드를 작성하시오.(단 result 변수가 0인 경우는 포함하지 않는다.), Content: int result = -5; if(__(1)__) result= rsult * (-1);, Answer: result < 0 "\
                            "[Example2] KC: 포인터, Question: 빈칸에 들어갈 코드를 작성하시오., Content: #include <stdio.h> void main() { short birthday; short __(1)__ ptr; ptr __(2)__ birthday; __(3)__ ptr = 0X0412; printf(\"birthday = &d (0x%04X)\n\", birthday, birthday) },  Blank1:*, Blank2:&, Blank3:* "\
                            "[Example3] KC:  동적 메모리 할당 및 해제, Question: 200byte 메모리를 동적으로 할당할 때 4byte씩 50개 그룹으로 사용하려고 한다. 빈칸에 들어갈 코드를 작성하시오., Content: int *p = (__(1)__))malloc(__(2)__)),  Blank1: int, Blank2: 200 "\
                            "[Example4] KC: 변수, Question: 빈칸에 알맞은 말을 채우시오, Content: __(1)__는 데이터를 저장하기 위한 메모리 공간을 의미 합니다., Blank1: 변수 "\
                            "[Example5] KC: 아스키코드, Question: 빈칸에 알맞은 말을 채우시오., Content: 컴퓨터에서 문자를 숫자로 바꾸어 저장하는 표준 형식을  __(1)__라고 합니다., Blank1: 아스키코드"

        elif subject == "OBJECT_ORIENTED_PROGRAMMING":
            example_blank = "[Example1] KC:배열 Question:빈칸에 들어갈 코드를 작성하시오 Content: public class ArrayTest{ public static void main(String[] args){ int[] numbers = {10, 20, 30}; for (___(1)___) ___(2)___ ; } } // output: 10 20 30 Blank1:int value: numbers Blank2:System.out.print(value+" "); "\
                            "[Example2] KC: 컨테이너 살펴보기 Question:빈칸에 알맞은 말을 채우시오. Content:프레임에서 컴포넌트를 붙일 수 있는 영역을 ___(1)___라고 한다. Blank1:Content Pane "\
                            "[Example3] KC:이벤트 처리 개요 Question:빈칸에 알맞은 말을 채우시오. Content:발생된 이벤트 객체에 반응하여 이벤트를 처리하는 객체를 ___(1)___ 라고 한다. Blank1:이벤트 리스너 "\
                            "[Example4] KC: 배치 관리자 Question:패널 p에 4 X 3 격자 모양으로 위젯들을 배치하려 한다. 배치관리자를 설정하는 아래의 코드의 빈칸에 들어갈 코드를 작성하시오. Content: p.setLayout( ___(1)___ ); Blank1:new GridLayout(4, 3) "\
                            "[Example5] KC:기본 도형 그리기 Question:(0,0)을 왼쪽 상단으로 하고 크기가 100 X 100인 사각형을 그리고자 한다. 빈칸에 들어갈 코드를 작성하시오. Content:class MyPanel extends JPanel{ public void paintComponent(Graphics g){ super.paintComponent(g); ___(1)___ ; } } Blank1:g.drawRect(0, 0, 100, 100);"


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
