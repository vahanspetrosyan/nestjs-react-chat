FROM node:18.16.0
WORKDIR /var/www
COPY ./server/package*.json ./
RUN npm ci
COPY ./server .
CMD ["npm", "run", "start:prod"]
