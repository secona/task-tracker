import { Express } from 'express';

export default (app: Express) => {
  app.use('/user', require('./user').default);
  app.use('/auth', require('./auth').default);
  app.use('/tasks', require('./tasks').default);
  app.use('/projects', require('./projects').default);
};
