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

### local-pm2, dev, test, prod (PM2)
```shell
# pm2 설치
npm i -g pm2
pm2 update

# linux 나 맥에서 pm2 실행시 sudo 붙일 것
```

### pm2 명령어
#### 상태 확인

- pid, cpu사용량, mem 사용량 확인 가능 

```shell
pm2 status
pm2 ls
pm2 l
```

#### 중지
```shell
pm2 stop 2 # id 2번 프로세스 멈춤
pm2 stop app # 이름을 줘도 됨. 전체 프로세스 멈춤
```

#### reload

- restart는 모든 프로세스를 죽인다음 다시 시작하는 방식이라 서비스 중단이 발생함. 
- reload는 최소 1개 이상의 프로세스를 유지하며 하나씩 재시작하는 방식.
- restart보다 reload를 사용하자
- reload는 0-second-downtime (다운타임 : 서버가 중지되어 클라이언트가 접속할 수 없는 시간)

```shell
pm2 reload app # 전체 프로세스 reload
```

#### 프로세스 삭제
```shell
pm2 delete 2
pm2 delete app
pm2 kill # 프로세스 전체 삭제
```

#### 로그 보기
```shell
pm2 log # 전체 프로세스 로그 보기
pm2 log [process name | process id] # 특정 프로세스
pm2 log --lines 200 # 200줄까지만 보기
pm2 log -err 200 # err 로그만 보기
```

### PM2 ecosystem.config.js 로 명령어 실행하기
#### 시작하기
```shell
# app-local은 ecosystem.config.js 파일에 선언된 app name
pm2 start --only app-local
```

#### scale
```shell
# 3개 눌리기
pm2 scale app +3
# 총 2개로 만들기
pm2 scale app 2
```

#### scale up 후 pm2 reload .\ecosystem.config.js --only app-local 를 실행하면?
```shell
# 원래 3개
pm2 scale app +3
# 이제 6개

pm2 reload .\ecosystem.config.js --only app-local  

[PM2] Applying action reloadProcessId on app [app-local](ids: [ 0, 1, 2, 3, 4, 5 ])
[PM2] [app-local](1) ✓
[PM2] [app-local](0) ✓
[PM2] [app-local](2) ✓
[PM2] [app-local](3) ✓
[PM2] [app-local](4) ✓
[PM2] [app-local](5) ✓

# 여섯개 그대로 유지됨
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