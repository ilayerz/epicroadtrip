FROM node:15

WORKDIR /usr/app

COPY package*.json ./

RUN apt-get update && apt-get install -y yarn

RUN yarn install

COPY . .

EXPOSE 8081:8081

CMD ["yarn", "run", "serve"]
