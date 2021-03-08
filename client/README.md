Web server & Cache server
=========================

Stateless한 webserver와 cache server입니다. 

    make start-server

위 명령어를 통해 블록체인의 정보로 서버를 동기화하며 실행할 수 있습니다.
분산원장의 모든 기록이 복구된 서버가 실행됩니다.

이로 인해, 분산원장에 기록된 계약은 사용자 또는 서버와 독립적이고,
분산된 서버를 통해 제공될 수 있습니다.

현재 상용 목적의 소프트웨어가 아닌 관계로,
직접적인 노드의 구축을 통해 서버가 Block을 읽어오지않고,
infura를 통해 읽도록 설정되어 있습니다.
따라서, infura 무료 제공 요청 한계치, infura web socket의 장애에 종속적입니다.
이 부분은 서비스 제공자의 개별 노드 운용을 통해 수정할 수 있습니다.

    /client/client_api/.env

의 RPC를 해당 노드로 변경하면 됩니다.
