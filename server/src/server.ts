import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes';

export function createServer() {
  const app = express();

  if (process.env.NODE_ENV === 'development') {
    Object.defineProperty(app.request, 'ip', {
      configurable: true,
      enumerable: true,
      get: () => '62.220.27.140',
    });
  }

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cookieParser());

  routes(app);

  return app;
}
