FROM mysql:latest


ENV MYSQL_ROOT_PASSWORD=abc123!@!
ENV MYSQL_DATABASE=defender2
ENV MYSQL_USER=me
ENV MYSQL_PASSWORD=abc123!@!
ADD ./initialize /docker-entrypoint-initdb.d

EXPOSE 3306

CMD ["mysqld"]