start :
	@echo "Start deploy contract"
	@cd core/decentralized;\
	make deploy
	@echo "Finish deploy contract"
	@echo "Start to make database and DBMS"
	@cd db;\
	docker build -t mysql .;\
	docker run -d -p 3306:3306 --name "mysql-db" mysql
	@echo "Finish making db"
	@echo "Start to build and running cache server"
	@cd client/client_api;\
	docker build -t server .;\
	ME=`curl bot.whatismyipaddress.com`;\
	echo ${ME};\
	docker run -d -p 3001:3001 -e DB="${ME}" server
	@echo "Finish building cache server"
	@echo "Start to make client webserver"
	@cd client/client_react;\
	docker build -t webserver .;\
	ME=`curl bot.whatismyipaddress.com`;\
	echo http://${ME}:80;\
	docker run -d -p 80:80 -e APIHOST="http://${ME}:3001" -e SELF="http://${ME}:80" webserver
	@echo "Finish making client webserver"

start-server :
	@echo "Start to make database and DBMS"
	@cd db;\
	docker build -t mysql .;\
	docker run -d -p 3306:3306 --name "mysql-db" mysql
	@echo "Finish making db"
	@echo "Start to build and running cache server"
	@cd client/client_api;\
	docker build -t server .;\
	ME=`curl bot.whatismyipaddress.com`;\
	echo ${ME};\
	docker run -d -p 3001:3001 -e DB="${ME}" server
	@echo "Finish building cache server"
	@echo "Start to make client webserver"
	@cd client/client_react;\
	docker build -t webserver .;\
	ME=`curl bot.whatismyipaddress.com`;\
	echo http://${ME}:80;\
	docker run -d -p 80:80 -e APIHOST="http://${ME}:3001" -e SELF="http://${ME}:80" webserver
	@echo "Finish making client webserver"
	
remove :
	@docker kill $$(docker ps -q) 
	@docker rm $$(docker ps -a -q)

test :
	@echo "script injection"
	@cd core/decentralized;\
	truffle exec --network ropsten script.js;\

initdb :
	@cd db/test;\
	pwd;\
	docker cp ./init_test.sql mysql-db:/;\
	pwd;\
	docker exec -it mysql-db bash 'mysql -u root -p < /init_test.sql'