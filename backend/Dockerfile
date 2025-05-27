FROM node:24-slim
WORKDIR /app

COPY package*.json ./
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    apt-get clean
RUN npm install
COPY . .

EXPOSE 5000
CMD ["node", "index.js"]