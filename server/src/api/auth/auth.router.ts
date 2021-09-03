import { Router } from 'express';
import google from './google/google.router';

const router = Router();

router.use('/google', google)

export default router;