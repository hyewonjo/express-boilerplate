const createApp = require("./app");

createApp().then((app) => {
    const appServer = app.listen(app.get('port'), () => {
        process.send('ready');
    });

    process.on('SIGINT', () => {
        app.set('isDisableKeepAlive', true);
        appServer.close(function () {
            console.log('server closed');
            process.exit(0);
        });
    });
});