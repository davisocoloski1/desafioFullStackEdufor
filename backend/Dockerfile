FROM node:20-alpine AS base
WORKDIR /app

FROM base AS production-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS app_build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN node ace build

FROM base AS production
ENV NODE_ENV=production
ENV HOST=0.0.0.0
EXPOSE 3333

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=app_build /app/build /app

CMD ["node", "./bin/server.js"]