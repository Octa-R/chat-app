# Stage 1: Build the API
FROM node:14-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

# Stage 2: Serve the built API with Node.js
FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist .

COPY package*.json ./

EXPOSE 3000

CMD [ "yarn", "start" ]