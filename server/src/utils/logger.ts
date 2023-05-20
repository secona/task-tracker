import { resolve } from 'path';
import winston, { format } from 'winston';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'blue',
});

export const logger = winston.createLogger({
  format: format.combine(
    format(info => ({
      ...info,
      level: info.level.toUpperCase(),
      category: info.category || 'App',
    }))(),
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss ZZ' }),
    format.printf(
      info =>
        `[\x1B[2m${info.timestamp}\x1B[0m] [${info.level}] [\x1B[38;2;255;165;0m${info.category}\x1B[0m] ${info.message}`
    )
  ),
  transports: [new winston.transports.Console({ level: 'debug' })],
});
