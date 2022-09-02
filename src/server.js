const createApp = require('./app');
const { logger } = require('./winston');

createApp().then((app) => {
    const appServer = app.listen(app.get('port'), () => {
        process.send('ready');
        logger.info(`${process.env.NODE_ENV} App listening at http://localhost:${app.get('port')}`);
    });

    process.on('SIGINT', () => {
        app.set('isDisableKeepAlive', true);
        appServer.close(function () {
            logger.info('server closed');
            process.exit(0);
        });
    });
});