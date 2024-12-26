import winston from "winston";

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs.log', level: 'info' }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: 'combined.log' }),
    // new winston.transports.DailyRotateFile({
    //     filename: 'Config/',
    //     dirname: '',
    //     datePattern: 'YYYY-MM-DD',
    //     maxFiles: '1d'
    // })
    // new winston.transports.DailyRotateFile({
    //     filename: `my-app-%DATE%.log`,
    //     dirname: 'config.logger',
    //     datePattern: 'YYYY-MM-DD-HH',
    //     maxSize: 20971520, //20MB
    //     maxFiles: 3,
    // })

  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger