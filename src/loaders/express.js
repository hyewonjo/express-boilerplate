const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuidV4 } = require("uuid");
const { logger } = require('../winston');
const path = require("path");
const {CommonError} = require("../errors/common_error");

module.exports = (app) => {
    app.set('port', process.env.PORT || 8080);

    setHelmet(app);

    app.use(express.json()); // content-type json
    app.use(express.urlencoded({ extended: false })); // content-type x-www.form-urlencoded
    app.use(express.static(path.join(__dirname, '../public')));

    setMorganLog(app);
    setKeepAlive(app);
    setErrorHandler(app);
};

function setHelmet(app) {
    app.use(helmet.contentSecurityPolicy());
    // 필요시 윗줄 주석걸고 아래줄 추가. (외부 도메인 js 경로 허용)
    // app.use(helmet.contentSecurityPolicy({
    //     directives: {
    //         ...helmet.contentSecurityPolicy.getDefaultDirectives,
    //         "script-src": ["'self'", "cdn.jsdelivr.net"]
    //     }
    // }));

    app.use(helmet.crossOriginEmbedderPolicy());
    app.use(helmet.crossOriginOpenerPolicy());
    app.use(helmet.crossOriginResourcePolicy());
    app.use(helmet.dnsPrefetchControl());
    app.use(helmet.expectCt());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.originAgentCluster());
    app.use(helmet.permittedCrossDomainPolicies());
    app.use(helmet.referrerPolicy());
    app.use(helmet.xssFilter());
}

function setMorganLog(app) {
    app.use((req, res, next) => {
        req.id = uuidV4();
        next();
    });

    app.use(morgan('[REQUEST] :uuid :remote-addr - :remote-user :method :url HTTP/:http-version\nREQUEST HEADER :request-header\nREQUEST BODY :request-body', {
        immediate: true,
        stream: logger.stream
    }));
    app.use(morgan('[RESPONSE] :uuid :remote-addr :method :url HTTP/:http-version :status :res[content-length] :response-time ms\nRESPONSE HEADER :response-header', {
        stream: logger.stream
    }));
    app.use((req, res, next) => {
        const oldWrite = res.write
        const oldEnd = res.end;

        const chunks = [];

        res.write = (chunk, ...args) => {
            chunks.push(chunk);
            return oldWrite.apply(res, [chunk, ...args]);
        };

        res.end = (chunk, ...args) => {
            if (chunk) {
                chunks.push(chunk);
            }
            const body = Buffer.concat(chunks).toString('utf8');
            if (req.is('application/json'))
                logger.info(`RESPONSE BODY ${body}`);

            return oldEnd.apply(res, [chunk, ...args]);
        };

        next();
    });
}

function setKeepAlive(app) {
    /*
     * keep-alive 를 사용하고 있다면 요청이 처리된 후에도 기존 연결이 계속 유지되기때문에
     * 서비스 reload 시 SIGINT 이후 마지막 요청은 connection 을 close 하도록 하기위함
     */
    app.set('isDisableKeepAlive', false);
    app.use((req, res, next) => {
        // server.js 에서 프로그램 종료 요청시 isDisableKeepAlive 값이 true 로 할당됨
        if (app.get('isDisableKeepAlive'))
            res.set('Connection', 'close');
        next();
    });
}

function setErrorHandler(app) {
    // router
    app.use('/users', require('../routes/users_routes'));

    // 404
    app.use((req, res, next) => {
        res.status(404).send('404');
    });

    // CommonError handler
    app.use((err, req, res, next) => {
        if (err instanceof CommonError)
            return res.status(err.statusCode).send(err.message);

        next(err);
    });

    // error logging
    app.use((err, req, res, next) => {
        logger.error(err.stack);
        if (req.xhr) {
            res.status(500).send('server error');
        }
        else {
            if (res.headersSent)
                return next(err);
            else
                res.status(500).send('500');
        }
    })
}
