import { Router } from 'express';
import auth from './auth/auth.router';
import users from './users/users.router';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

export default router;