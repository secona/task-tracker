import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.sendStatus(501);
});

router.post('/', (req, res) => {
  res.sendStatus(501);
});

export default router;
