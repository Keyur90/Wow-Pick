# Build context is set to ./dist/apps/orders-api

FROM node:lts-alpine  as builder
WORKDIR /home/node/app
COPY package.json .
COPY yarn.lock .
RUN yarn add apollo-server-express@2.25.2 --frozen-lockfile

FROM node:lts-alpine
WORKDIR /home/node/app
COPY --from=builder /home/node/app/ /home/node/app/
COPY . .
CMD node ./main.js
