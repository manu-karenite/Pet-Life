from node:16.17.1
COPY package.json .
RUN npm install
RUN npm i pm2 -g
COPY . .
EXPOSE 8000
CMD ["pm2","start","server.js"]
