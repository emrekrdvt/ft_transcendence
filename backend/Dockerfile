FROM node:latest

RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY wait.sh .
COPY . .

RUN npm install


EXPOSE 3000

CMD ["sh", "/app/wait.sh"]
