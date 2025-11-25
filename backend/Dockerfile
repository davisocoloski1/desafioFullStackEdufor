FROM node:22-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Build do Adonis
RUN node ace build

WORKDIR /app/build

EXPOSE 3333

# Comando final: roda migrations + inicia o servidor
CMD ["sh", "-c", "node ace migration:run --force && node bin/server.js"]
