import { Router } from 'express';
import prisma from '~/lib/prisma';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router.post('/', authenticate, (req, res) => {
  const { userId } = req.accessToken;
  prisma.task
    .create({
      data: {
        task: String(req.body.task),
        author: { connect: { userId } },
      },
    })
    .then(data => res.json({ data }))
    .catch(err => {
      switch (err.code) {
        case 'P2025':
          res.clearCookie('access_token');
          res.status(404).json({ message: 'user not found' });
          return;
        default:
          res.send(err);
      }
    });
});

// TODO: check ownership middleware
router
  .route('/:taskId')
  .all(authenticate)
  .get((req, res) => {
    const { taskId } = req.params;
    prisma.task
      .findUnique({ where: { taskId } })
      .then(data => res.status(data ? 200 : 404).json({ data }))
      .catch(err => res.send(err));
  })

  .patch((req, res) => {
    const { taskId } = req.params;
    prisma.task
      .update({
        where: { taskId },
        data: req.body,
      })
      .then(data => res.json({ data }))
      .catch(err => {
        switch (err.code) {
          case 'P2025':
            return res.status(404).json({ data: null });
          default:
            res.send(err);
        }
      });
  })

  .delete((req, res) => {
    const { taskId } = req.params;
    prisma.task
      .delete({ where: { taskId } })
      .then(() => res.json({ data: null }))
      .catch(err => {
        switch (err.code) {
          case 'P2025':
            return res.status(404).json({ data: null });
          default:
            res.send(err);
        }
      })
  })

export default router;
