DETOK
=====

1. Introduction
----------------

블록체인을 사용한 모니터링 요원 분산 고용 시스템

기존의 모니터링팀의 운용의 한계를 넘어, 스마트 컨트렉트와 합의 모델을 통해 불특정 다수의 다양한 국적에 분산된 모니터링 요원을 작업의 단위(한 건의 단속)으로 고용하여, 멀티미디어가 다양한 국가에서 향유되는 상황에 적합한 시스템을 제작합니다.

블록체인의 컨트렉트를 사용하는 이유는 다음과 같습니다.

1. 다국가에서의 불특정 다수의 신고의 필요성과 보상 인프라의 효율적 구축
2. 모니터링 요원과 저작권자(저작인접권자)의 보상체계의 비신뢰성
 - 불법 저작물의 유통에 대한 정보를 취득한 저작권자가 보상을 주지 않는 경우를 고려하여, 합의 모델을 구축


| 컴포넌트 | 용도 | 디렉토리 |
|---|---------|---:|
| `Web application` | 사용자가 블록체인과 통신할 수 있도록 하는 인터페이스 | `/client/client_react` |
| `API server` | 사용자에게 좋은 사용성과 시각적인 이미지 등을 위한 블록체인의 cache와 같은 역할을 합니다. | `/client/client_api` |
| `Contract` | 불법 모니터링과 보상을 부여하기 위한 정보 | `/core/decentralized` |
| `Web crawler` | 한 건의 정보에 대한 자동화된 탐색 | `/work/work_machine` |



2. Installation
----------------

* Docker and Makefile

다음과 같은 과정을 수행합니다.

1. 웹 서버의 컨테이너 이미지 빌드 및 실행
2. 캐시 서버의 컨테이너 이미지 빌드 및 실행(백엔드)
3. 캐시 서버의 데이터 베이스 컨테이너 이미지 빌드 및 실행
4. Ethereum Ropsten network에 스마트 컨트렉트 deploy

위 과정은 Ropsten네트워크의 상태에 종속적이고, infura의 node에 보내는 요청이
때때로 timeout을 유발하기 때문에 여러번 시도해야 하거나, gas limit을 올려야 할 수 도 있습니다.

준비사항

    truffle, nodejs, docker가 설치되어 있어야 합니다.
    Ropsten network의 계정에 10eth이상 소지해야 합니다.
    소지한 계정의 정보와 infura의 프로젝트 id를 core/decentralized/secrets.json 에 작성해주세요
    

빌드 실행

    cd core/decentralized
    npm install
    cd ~/<your directory>/Detok
    make start

테스트 거래 수행

    make test
    make initdb

* 웹 인터페이스만 빌드

컨트렉트는 새로 deploy하지 않고, 인터페이스 서버들만 빌드하고 실행하는 방법입니다.

    make start-server

를 수행하시면 됩니다.

3. Characteristic
-----------------

본 프로젝트는 실사용을 목적으로 하지 않는 토이 프로젝트입니다.
프로젝트의 구현에는 다음과 같은 기술 스택과 오픈 라이브러리가 사용되었습니다.

    Jenkins를 통한 CI/CD
    Container deployment
    React
    Expressjs
    Mysql
    Truffle
    Ganache
    Openzepplin

개발을 위해 사용한 언어는 다음과 같습니다.

    Python
    Solidity
    Javascript
    Shell script
    Declaritive pipeline script in jenkins




4. Contributor
--------------

| Contributor | 역할 |
|---|---------|
| `서왕규` | 아키텍처 설계 및 전체 구현, 문서화 작업 |
| `김효일` | 문서화 작업 및 프론트엔드 설명 페이지 구현 |


    

