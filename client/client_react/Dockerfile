FROM node:12.16.3 as builder
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY . /app

RUN npm install
ARG APIHOST
ENV APIHOST=http://13.209.109.159:3001
ARG SELF 
ENV SELF=http://13.209.109.159:80
ARG ID 
ENV ID=3
EXPOSE 80
RUN REACT_APP_API="${APIHOST}" REACT_APP_URL="${SELF}" REACT_APP_ID="${ID}" npm run build

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
