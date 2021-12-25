import { Express } from 'express';
import users from './routes/users';
import auth from './routes/auth';
import projects from './routes/projects';
import tasks from './routes/tasks';

export default (app: Express) => {
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/projects', projects);
  app.use('/api/tasks', tasks)
};
