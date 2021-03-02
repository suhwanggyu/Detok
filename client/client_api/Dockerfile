FROM node:12.16.3

WORKDIR /usr/src/client_app

COPY . .
RUN npm install
ARG DB
ENV DB=localhost
ARG DB_ID 
ENV DB_ID=root
ARG DB_PASSWORD 
ENV DB_PASSWORD=abc123!@!
ARG RPC 
ENV RPC=wss://ropsten.infura.io/ws/v3/bad7e4e7fe3f43389a533e2995d9f3c5
ARG ID 
ENV ID=3

EXPOSE 3001

CMD ["npm","start"]