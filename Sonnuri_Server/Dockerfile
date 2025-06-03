FROM python:3.9-slim

# 필수 패키지 설치
RUN apt-get update && apt-get install -y \
    ffmpeg libsm6 libxext6 libgl1 libglib2.0-0 \
    && apt-get clean

# 작업 디렉토리
WORKDIR /app

# requirements.txt 먼저 복사하고 설치
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# 나머지 앱 파일 복사
COPY . .

# 포트 오픈
EXPOSE 8000

# 실행 명령
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
