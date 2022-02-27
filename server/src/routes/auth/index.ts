import { Router } from 'express';

const router = Router();

router.use('/google', require('./google').default);

export default router;