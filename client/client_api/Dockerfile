FROM node:12.16.3

WORKDIR /usr/src/client_app
COPY . .
RUN npm install

EXPOSE 3001
EXPOSE 3006
EXPOSE 3007
CMD ["npm","start"]