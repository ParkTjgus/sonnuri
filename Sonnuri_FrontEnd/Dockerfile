# Node 기반 이미지
FROM node:20-slim

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package.json ./
COPY yarn.lock ./

# 의존성 설치 (npm → yarn)
RUN yarn install

# 소스 코드 복사
COPY . .

# 포트 오픈
EXPOSE 5173

# 개발 서버 실행
CMD ["yarn", "dev", "--host"]
