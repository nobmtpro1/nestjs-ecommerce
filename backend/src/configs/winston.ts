import * as winston from 'winston';

export default {
  level: 'silly',
  format: winston.format.combine(
    // winston.format.colorize({ all: true }),
    winston.format.timestamp({
      format: 'DD/MM/YYYY-HH:mm:ss.mmm',
    }),
    winston.format.printf((info) =>
      info.level === 'error'
        ? `[${info.timestamp}] [${info.level.toUpperCase()}]: ${
            info.message
          } >>>\n${JSON.stringify(info)}`
        : `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`,
    ),
  ),
  defaultMeta: { service: 'logger-service' },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 10 * 1024 * 1024,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 10 * 1024 * 1024,
    }),
  ],
};
