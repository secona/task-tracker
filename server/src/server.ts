import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes';

export function createServer() {
  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cookieParser());

  routes(app);

  return app;
}
