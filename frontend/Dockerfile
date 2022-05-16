FROM node:lts
WORKDIR /my-project

COPY package*.json ./


COPY . .
RUN ls

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]