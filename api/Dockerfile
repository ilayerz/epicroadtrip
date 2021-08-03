FROM node:10

# Create app directory
WORKDIR /usr/src/app
ADD ./ /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
RUN npm install -g sequelize-cli
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

#RUN npm install --save-dev sequelize-cli && npx sequelize db:create && npx sequelize-cli db:migrate

EXPOSE 8080
CMD [ "npm", "start"]