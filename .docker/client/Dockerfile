FROM node:18.16.0 as builder
WORKDIR /var/www
COPY ./client/package*.json ./
RUN npm ci
COPY ./client .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY .docker/client/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /var/www/dist /usr/share/nginx/html
