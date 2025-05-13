FROM node:24-slim
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Installe un serveur statique
RUN npm install -g serve

# Lancer le build avec serve
CMD ["serve", "-s", "build", "-l", "4173"]