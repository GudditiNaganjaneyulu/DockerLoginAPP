FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install mongoose express body-parser mongodb

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
