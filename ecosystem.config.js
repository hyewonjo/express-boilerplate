module.exports = {
    apps: [{
        name: 'app-local',
        script: './src/server.js',
        instances: 2,
        exec_mode: 'cluster',
        wait_ready: true,
        listen_timeout: 50000,
        kill_timeout: 5000,
        watch: ['src'],
        ignore_watch: ['node_modules'],
    }, {
        name: 'app-dev',
        script: './src/server.js',
        instances: 2,
        exec_mode: 'cluster',
        wait_ready: true, // 마스터 프로세스에게 ready 이벤트를 기다려라
        watch: false,
        listen_timeout: 50000, // ready 이벤트를 기다릴 시간값(ms)
        kill_timeout: 5000, // SIGINT 보내고 SIGKILL 보내는 텀을 디폴트값 1600ms에서 5000ms로 수정 (요쳥이 다 끝나지 않았는데 SIGKILL이 보내지는 경우 방지하기위해 시간을 넉넉히 줌)
    }, {
        name: 'app-test',
        script: './src/server.js',
        instances: -1,
        exec_mode: 'cluster',
        wait_ready: true,
        watch: false,
        listen_timeout: 50000,
        kill_timeout: 5000,
    }, {
        name: 'app-prod',
        script: './src/server.js',
        instances: -1,
        exec_mode: 'cluster',
        wait_ready: true,
        watch: false,
        listen_timeout: 50000,
        kill_timeout: 5000,
    }]
}