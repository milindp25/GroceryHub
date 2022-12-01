# Build step #1: build the React front end
FROM node:16.15.1 as build
WORKDIR /app


COPY package*.json ./
RUN npm install -g npm@9.1.2
COPY . .

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
