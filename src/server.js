const createApp = require('./app');
const { logger } = require('./winston');

createApp().then((app) => {
    const appServer = app.listen(app.get('port'), () => {
        process.send('ready');
        logger.info(`${process.env.NODE_ENV} App listening at http://localhost:${app.get('port')}`);
    });

    process.on('SIGINT', () => {
        app.set('isDisableKeepAlive', true);
        // app server close로 즉시 닫았지만 keep alive 때문에 http connection이 끊어지지 않을 수 있다.
        // 그래서 추가로 app express loader에서 middleware로 응답 헤더에 Connection: close를 보낸다.
        appServer.close(function () {
            logger.info('server closed');
            process.exit(0);
        });
    });
});