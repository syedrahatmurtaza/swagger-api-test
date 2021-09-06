FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 4000
CMD ["npm", "start"]