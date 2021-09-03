import { Router } from 'express';
import auth from './auth/auth.router';

const router = Router();

router.use('/auth', auth);

export default router;