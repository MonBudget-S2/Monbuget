FROM node:18.0.0-alpine as development

USER node

WORKDIR /home/node
EXPOSE 3000

FROM node:18.0.0-alpine as build

USER node

WORKDIR /home/node

COPY package.json .

RUN npm install

COPY  --chown=node:node . .

RUN npm run build
EXPOSE 3000

FROM node:18.0.0-alpine as production

USER node

WORKDIR /home/node

COPY --from=build --chown=node:node /home/node/dist ./dist
COPY --from=build --chown=node:node /home/node/node_modules ./node_modules
COPY --from=build --chown=node:node /home/node/package.json ./package.json
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
