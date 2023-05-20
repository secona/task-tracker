import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { logger } from './utils/logger';

export function createServer() {
  const app = express();

  app.use(express.json());
  app.use(
    morgan(
      ':method :url [:status] [:response-time ms] - :res[content-length]',
      {
        stream: {
          write: msg => logger.info(msg.trim(), { category: 'HTTP' }),
        },
      }
    )
  );
  app.use(cookieParser());

  routes(app);

  return app;
}
