FROM node:18.4.0-alpine
RUN npm install -g npm
RUN mkdir -p /var/www/token
WORKDIR /var/www/token
ADD . /var/www/token
RUN npm install
CMD npm run build && npm run start:prod
