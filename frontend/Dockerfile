FROM node:22-alpine AS build

WORKDIR /dist/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build frontend --configuration production

FROM nginx:alpine

COPY --from=build /dist/src/app/dist/frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]