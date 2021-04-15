웹 서버
=======


1. Build and Execution
-----------------------

Node

    npm install
    npm start
    

Docker
    docker build -t webserver .
    docker run -d -p 80:80 -e APIHOST={Api server name} -e SELF={Machine ip} webserver


2. Description
--------

블록체인의 인터페이스 역할을 수행하는 웹 서버입니다. 

1. 사용자에게 블록체인의 정보를 보여줍니다.
2. 사용자에게 블록체인의 정보를 캐싱한 api server에서 보낸 자원을 보여줍니다.
3. 사용자가 블록체인에 거래를 요청할 수 있게합니다.



웹 서버는 Stateless 하기 때문에, <br />
사용성 증가와 사용자의 수수료 부담을 줄이기 위해, 거래 로직에 필요하지 않은 정보를 블록체인 외부에 두기 위해<br />
데이터베이스를 포함하는 was 서버가 하나 더 존재합니다. <br />


3. Developer
------------

wanggyu, suh