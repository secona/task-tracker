import { Router } from 'express';
import auth from './auth/auth.router';
import users from './users/users.router';
import tasks from './tasks/tasks.router';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/tasks', tasks);

export default router;