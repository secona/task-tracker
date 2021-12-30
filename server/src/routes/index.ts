import { Express } from 'express';

export default (app: Express) => {
  app.use('/api/me', require('./me').default);
  app.use('/api/auth', require('./auth').default);
  app.use('/api/projects', require('./projects').default);
};
