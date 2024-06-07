

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
        example_summary = ""

        if subject == "OPERATING_SYSTEM":
            example_summary = (
                "[example1] # Ch1. Introduction ## Operating system : 컴퓨터의 구성요소들을 관리하는 소프트웨어 레이어 **컴퓨터의 구성** - 소프트웨어: 응용 프로그램과 운영체제 - 하드웨어: 프로세서, 메인메모리, 디스크, 입출력 장치 ### **OS의 역할** : 동시에 여러 프로그램을 실행할 수 있게 하는 역할 - ***자원 관리자*** - memory, I/O devices와 다른 자원들을 보호하고 관리 - time, space에 따른 자원 공유 - 명령어 집합과 그의 자원을 관리 ### 운영체제 역사 | 1945-55 | Vacuum Tubes | | --- | --- | | 1955-65 | Transistors and Batch System | | 1965-80 | ICs and Multiprogramming | | 1980~ | Personal Computer | ## 하드웨어 - **CPU** : memory로 부터 명령어 읽어와서 수행. - **Memory** : 실행 중인 프로그램을 적재. - **I/O device controller**: 디스크, 마우스와 같은 입출력 장치 관리. - **Bus** : 제어신호, 데이터, 주소 버스로 구성 ## Register : CPU 안에 있는 메모리. 1. CPU는 메모리에서 데이터를 레지스터로 읽어 옴. 2. 연산 결과를 레지스터에 저장 후 메모리에 저장 ### **Register의 종류** - **범용 레지스터** - **MBR** (Memory buffer register): 메모리에서 읽어온 데이터 저장 - **MAR** (Memory address register): 데이터의 메모리 주소 저장 - **stack pointer**: 메모리 내 스택 윗부분을 저장. - **특수 레지스터** : 프로세서의 연산 컨트롤을 위해 프로세서에 의해 사용됨. - **PC**: 다음 실행(fetch)할 명령어의 메모리 주소 저장 - **IR** (Instruction Register) - **PSW (Program Status Word)** : 코드 비트의 조건 (플래그) ex)우선순위, 모드 등 ### CPU pipeline : fetching, decoding, executing one  instruction at a time. 각각을 수행하는 유닛을 여러개 가짐. **Superscalar CPU**: 유닛 세트 여러 개 + Holding buffer **멀티스레드 CPU** : 하나의 코어가 여러 명령어를 동시에 처리 ### Interrupts : Suspends the normal sequence of execution. - 종류: 동기, 비동기 **인터럽트 처리 과정** 1. 인터럽트가 발생 2. 실행중인 유저 프로그램을 중단 3. **interrupt handler를** 실행. 4. 이후 실행중이던 프로그램으로 다시 돌아온다"
            +   "[example2] # 파일시스템 관리와 최적화 요약 ## 1. 파일 시스템의 기본 개념 ### (1) 파일 시스템의 필수 조건 - 많은 양의 정보를 저장할 수 있어야 함 - 프로세스가 종료된 후에도 정보가 유지되어야 함 - 여러 프로세스가 동시에 접근 가능해야 함 ### (2) 디스크의 구조와 관련 질문 - 디스크는 일렬로 배열된 고정 크기 블록으로 구성 - **주요 질문들:** - 정보를 어떻게 찾을 것인가? - 사용자가 다른 사용자의 데이터를 읽는 것을 어떻게 방지할 것인가? - 어떤 블록이 비어 있는지 어떻게 알 수 있을 것인가? ### (3) 파일과 파일 시스템 - 파일: 저장 장치에서 정보를 저장하는 기본 단위 - 바이트 배열 - 고유한 경로 이름 - 접근 제어 - 파일 시스템: 파일을 사용하는 서비스 제공하는 소프트웨어의 집합 ### (4) 파일 이름과 확장자 - 파일 확장자 예: - `.bak`: 백업 파일 - `.c`: C 소스 프로그램 - `.pdf`: PDF 파일 - `.zip`: 압축 아카이브 등 ## 2. 파일 구조와 타입 ### (1) 파일 구조 - 바이트 시퀀스 - 레코드 시퀀스 - 트리 구조 ### (2) 파일 타입 - 실행 파일, 아카이브 등 여러 타입 ### (3) 파일 속성 - **주요 파일 속성:** - 보호: 누가 어떤 방식으로 접근 가능한지 - 생성자, 소유자 등 다양한 속성 ### (4) 파일 접근 방식 - **순차 접근:** 파일의 앞에서부터 순차적으로 읽고 씀 - **직접 접근:** 임의 위치로 이동하여 읽고 씀 ### (5) 파일 공유 - 여러 프로세스가 파일을 동시에 열 수 있는가? - 파일 읽기/쓰기 권한 제어 ### (6) 파일 조작 관련 시스템 호출 - 생성, 삭제, 읽기, 쓰기, 열기, 닫기 등 주요 호출들 ## 3. 디렉토리 시스템 ### (1) 디렉토리의 개념 - 특수한 파일로 파일에 관한 정보 저장 ### (2) 계층적 디렉토리 시스템 - 디렉토리가 트리 구조로 구성됨 ### (3) 경로 이름 - **절대 경로:** 루트 디렉토리부터의 경로 - **상대 경로:** 현재 작업 디렉토리부터의 경로 ### (4) 디렉토리 조작 관련 시스템 호출 - 생성, 읽기, 삭제, 열기, 연결, 닫기, 연결 해제 등에 관련된 호출들 ## 4. 파일 시스템 할당 방식 ### (1) 연속 할당 - 파일 생성 시 연속된 블록을 할당 - 동적 파일 생성 및 삭제 시 외부 단편화 발생 가능 ### (2) 연쇄 할당 - 각 블록이 다음 블록에 대한 포인터 포함 - 외부 단편화 없음 - 동적 파일 생성 및 삭제에 적합 ### (3) 인덱스 할당 - 인덱스 블록이 파일의 데이터 블록 목록 가짐 - 외부 단편화 문제 없음 - 동적 생성 및 삭제에 적합 ## 5. 유닉스 파일 시스템 설계 - **i-node:** 각 파일의 속성과 블록 주소 저장 - **디스크 레이아웃:** 파티션 테이블, 부트 블록, 슈퍼블록, 자유 공간 관리, i-node, 루트 디렉토리 등"
            )

        elif subject == "COMPUTER_COMMUNICATION":
            example_summary = (
                "[example1] ## 1.4 delay, loss, throughput in networks ### Delay, loss 발생 이유 1. packet의 도착 속도 > output link 속도. 2. packet이 queue에 들어가게 됨. → delay 3. queue가 다 차있으면 packet 버려짐. → loss ### Delay의 네 가지 요소 - Nodal processing: 노드 처리 시간. ex) 비트 에러 체크 - Queueing delay: output link에서 전송 대기 시간. - transmission time: 데이터를 신호로 바꿔 내보내는 시간. packet length/link bandwidth - propagation delay: link위 전송 시간. length of physical link/propagation speed ### Throughput : 단위 시간당 송신자와 수신자 사이에 전송된 비트의 수 - end-end throughput: 더 작은 throughput에 의해 결정 됨. - bottleneck: throughput이 가장 작은 link. ## 1.5 protocol layers, service models ### Layer → 모듈화를 통해 유지보수 유리. 복잡한 시스템을 다루기에 좋음. ### **Internet protocol stack** - **application**: network application을 보조. ex) FTP, SMTP, HTTP - **transport**: proce - **network**:  source 부터 dest까지 datagram의 routing. ex) IP, routing protocol - **link**: 이웃하는 네트워크 구성요소 사이의 데이터 전달. ex) Ethernet, 802.110(WiFi) - **physical**: 전선의 비트들 전송 ### ISO/OSI reference model : 표준화 기구의 이상적인 모델 (7-layer) → *효율성이 떨어진다 !!* application layer와 transport layer 사이에 **presentation, session layer**가 존재. ### PDU (protocol data unit) - **header** : 중요한 정보 포함 - **L4 - PDU** : message L3-PDU : segment - **encapsulation**: head 붙이기 - **decapsulation**: 작게 쪼개기"
            )
        
        elif subject == "C_LANGUAGE":
            example_summary = (
                "[example1] # Ch4. 클래스와 객체I ## 4.1 객체 지향 프로그래밍이란? ### 객체 - 객체의 상태 - 객체의 동작 ### 객체 지향 프로그래밍 : 데이터와 함수를 하나의 덩어리로 묶어 생각하는 방법 ### 객체 지향 프로그래밍의 특징 1. 정보 은닉 2. 상속 3. 다형성 4. 추상화 ## 4.2 클래스와 객체 만들기 ### 클래스 : 객체에 대한 설계도 - 인스턴스: 클래스로부터 만들어지는 각각의 객 ### 클래스 작성 ex) ```java public class Circle{ public int radius; /*필드*/ public String color; public double getArea(){ /*메소드*/ return 3.14*radius*radius; } } ``` ### 객체 생성 1. 참조 변수 선언. 2. new 연산자로 객체 생성. 3. 객체의 필드, 메소드 사용. ex) ```java Circle obj; obj = new Circle(); obj.radius = 100; obj.color = \"blue\"; double area = obj.getArea(); ``` ### 참조 변수 : 객체를 참조할 때 사용되는 변수. ex) 배열, 클래스. 인터페이스"
            +   "[example2] # 포인터 요약 ## 1. 포인터의 기초 - **포인터란**: 주소를 가진 변수 - **변수의 주소**: 메모리에 저장되며, 바이트 단위로 액세스됨 - **포인터 선언**: ```c int *p;  // 정수를 가리키는 포인터 선언 ``` ## 2. 포인터의 연산 - **주소 연산자** `&`: 변수의 주소를 반환 - **간접 참조 연산자** ``: 포인터가 가리키는 곳의 내용을 반환 - **포인터 연산**: 증가, 감소, 덧셈, 뺄셈 - **형변환**: 필요한 경우 명시적으로 포인터의 타입을 변경 가능 ## 3. 포인터와 배열 - **포인터와 배열의 관계**: 배열 이름이 바로 포인터, 포인터는 배열처럼 사용 가능 - **배열 매개변수**: 배열의 이름은 포인터와 동일하게 동작 ```c void sub(int b[], int size); void sub(int *b, int size); ``` ## 4. 포인터와 함수 - **값에 의한 호출 (Call by Value)**: 함수로 복사본이 전달 - **참조에 의한 호출 (Call by Reference)**: 함수로 원본이 전달, C에서는 포인터로 구현 - **scanf 함수**: 변수에 값을 저장하기 위해 변수의 주소를 받음 - **여러 결과 반환**: 포인터를 사용해 여러 반환값 전달 가능 ```c int get_line_parameter(int x1, int y1, int x2, int y2, float *slope, float *yintercept); ``` ## 5. 포인터 사용의 장점 - 연결 리스트나 이진 트리 등 향상된 자료구조 생성 가능 - 함수 외부의 변수 값을 변경 가능 - 동적 메모리 할당 가능 ## 6. 포인터 사용시 주의점 - 초기화되지 않은 포인터 사용 금지 - NULL 포인터로 초기화 필요 - 포인터 타입과 변수 타입 일치 필요 ## 7. 예제 코드 - **포인터 기본 사용 예제**: ```c int i = 3000;           // 변수 i에 3000을 할당 int *p = &i;            // 포인터 p에 변수 i의 주소를 할당 printf(\"i=%d\n\", i);    // i의 값인 3000 출력 printf(\"&i=%u\n\", &i);  // i의 주소 출력 printf(\"p=%u\n\", p);    // 포인터 p가 가리키는 주소 출력 (i의 주소와 동일) printf(\"*p=%d\n\", *p);  // 포인터 p가 가리키는 변수의 값 출력 (i의 값인 3000 출력) ``` - **scanf 사용 예제**: ```c int x; scanf(\"%d\", &x); ```"
            )

        elif subject == "OBJECT_ORIENTED_PROGRAMMING":
            example_summary = (
                "[example1] # Ch6. 표준 출력 함수 ## 6.1 라이브러리 ### 라이브러리 : 지속적으로 업데이트가 필요한 함수들은 소스파일에 유지하고 나머지 함수는 라이브러리에 넣어서 관리. 기계어로 번역되어 있음. ### 라이브러리 파일 만드는 방법 1. 소스 파일 컴파일 2. 목적파일 프로그래머가 변환 3. 라이브러리 파일 완성 ## 6.2 라이브러리 사용 설명서, 헤더 파일 ### 헤더 파일 : 라이브러리에 있는 함수 원형을 미리 선언해 둔 파 ex) ```c int Add(int value1, int calue2); int Sub(int value1, int calue2); ``` ## 6.3 전처리기 ### 전처리기 : 프로그래머가 원하는 사항을 컴파일러에 직접 지시하는 문법 ### 전처리기 #include : 컴파일에 자신이 명시한 파일을 읽도록 지시 ex) ```c #include \"MyMath.h\" ``` ### 전처리기 #define : 상수나 명령문을 치환하는 문법 ex) ```c #define MAX_COUNT 3 ```"
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
                + "Subtopics should be numbered, and Keep in mind there should be a maximum of 7 subtopics, no more than that."
                + "You have to keep in mind that The entire summary must be made on one side of A4 paper."
                + "You must output the summary content in accordance with the flow and order of the study materials provided."
                + "You need to create a summary that will help students improve their learning efficiency right before the exam for this subject, so Keep in mind that omit unnecessary information and include only the really important information likely to be on the exam ."
                + "If the summary includes an output function such as 'print()' or 'printf()' or 'println()', Keep in mind that you have to provide the output result as a comment on the corresponding code line."
                + "Keep in mind that you must write summary in Markdown format."
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
            {"role": "system", "content": sys_content_for_summary + example_summary},
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
