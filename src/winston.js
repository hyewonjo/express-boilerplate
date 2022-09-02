const env = process.env.NODE_ENV || 'development';

const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const { combine, timestamp, printf, label } = winston.format;
const logDir = 'logs';
const config = require('./config')[env];

const logFormat = combine(
    timestamp({
        format: 'YYYY-MM-DDTHH:mm:ssZZ',
    }),
    label({
        label: process.pid,
    }),
    printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    }),
);

const logger = winston.createLogger({
    format: logFormat,
    transports: [
        // normal log
        new winstonDaily({
            level: config.logLevel,
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: '%DATE%.log',
            maxFiles: 30, // 30 days
            zippedArchive: true,
        }),
        // error log
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: '%DATE%.error.log',
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

// morgan logging 을 winston log stream 으로 출력되도록
logger.stream = {
    write: message => {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
}

if (process.env.NODE_ENV === 'local') {
    logger.add(new winston.transports.Console({
        format: logFormat,
        level: config.logLevel
    }));
}

module.exports = {
    logger
};