import winston, { format } from 'winston';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'blue',
});

export const logger = winston.createLogger({
  format: format.combine(
    format(info => ({ ...info, level: info.level.toUpperCase() }))(),
    format.align(),
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }),
    format.printf(
      info =>
        `[\x1B[2m${info.timestamp}\x1B[0m] [${info.level}] ${info.message}`
    )
  ),
  transports: [new winston.transports.Console({ level: 'debug' })],
});
