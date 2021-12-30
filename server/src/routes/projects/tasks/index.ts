import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.sendStatus(501);
});

router
  .route('/:taskId')

  .get((req, res) => {
    res.sendStatus(501);
  })

  .patch((req, res) => {
    res.sendStatus(501);
  })

  .delete((req, res) => {
    res.sendStatus(501);
  });

export default router;