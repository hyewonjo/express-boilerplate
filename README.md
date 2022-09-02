# 프로젝트 실행하기
## .env 파일 생성  
root 경로에 .env파일 생성하여 사용할 것  
.env파일은 절대 public 저장소에 오픈하지 않는다.
```
NODE_ENV=local
port=8080
```
## 실행하기
### local
```shell
npm run local
```

# sequelize
replication read, write 각각 connection pool 설정하는방법 (이걸 해킹이라고 표현함)
sequelize.connectionManager.pool.read._factory.max = 50;  
sequelize.connectionManager.pool.read._factory.min = 5;

여러 프로세스에서 데이터베이스에 연결하는 경우 프로세스당 하나의 인스턴스를 생성해야 하지만  
각 인스턴스의 최대 연결 풀 크기는 총 최대 크기를 준수해야 합니다.  
예를 들어, 최대 연결 풀 크기가 90이고  
세 개의 프로세스가 있는 경우  
각 프로세스의 Sequelize 인스턴스는 최대 연결 풀 크기가 30이어야 합니다.  
> pm2로 프로세스를 여러개 띄우면, 그 여러개가 sequelize 인스턴스를 각각 가질거니까 dbcp 도 각각 가진다.  
그러니 프로세스당 dbcp 값을 pool 에 설정 필요