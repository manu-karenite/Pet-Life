from node:16.17.1
COPY package.json .
RUN npm install
RUN npm i nodemon -g
COPY . .
EXPOSE 8000
CMD ["npm","start"]
