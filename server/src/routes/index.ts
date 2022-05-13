import { Express } from 'express';

export default (app: Express) => {
  app.use('/api/users', require('./users').default);
  app.use('/api/auth', require('./auth').default);
  app.use('/api/projects', require('./projects').default);
};
