FROM node:alpine

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000 

CMD ["npm", "start"]
