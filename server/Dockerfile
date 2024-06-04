FROM python:3.9

# 현재 디렉토리의 모든 파일들을 컨테이너의 /app 디렉토리에 복사
COPY . /app

# python의 작업 위치 /app
WORKDIR /app

RUN apt-get update && apt-get install -y \
    libhdf5-dev \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*


RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN pip install tensorflow==2.10.0 --force-reinstall


# Expose the port the app runs on
EXPOSE 8000

# 가상 환경에서 flask app 실행
CMD ["python3", "run.py"]

