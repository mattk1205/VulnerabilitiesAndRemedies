FROM node:22.17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]



# For PROD
# FROM _______
#
#WORKDIR /app
#
#COPY package.json .
#
#RUN npm install
#
#RUN npm i -g serve
#
#COPY . .
#
#RUN npm run build
#
#EXPOSE 3000
#
#CMD [ "serve", "-s", "dist" ]