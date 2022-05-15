import { Express } from 'express';

export default (app: Express) => {
  app.use('/api/user', require('./user').default);
  app.use('/api/auth', require('./auth').default);
  app.use('/api/tasks', require('./tasks').default);
  app.use('/api/projects', require('./projects').default);
};
