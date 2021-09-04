import { Router } from 'express';
import prisma from '~/lib/prisma';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router
  .route('/me')
  .all(authenticate)

  .get((req, res) => {
    const { userId } = req.accessToken;
    prisma.user
      .findUnique({ where: { userId }, include: { tasks: true } })
      .then(data => {
        if (!data) res.clearCookie('access_token');
        res.status(data ? 200 : 404).json({ data });
      })
      .catch(err => res.send(err));
  })

  .delete((req, res) => {
    const { userId } = req.accessToken;
    prisma
      .$transaction([
        prisma.task.deleteMany({ where: { authorId: userId } }),
        prisma.user.delete({ where: { userId } }),
      ])
      .then(() => res.clearCookie('access_token').json({ data: null }))
      .catch(err => {
        switch (err.code) {
          case 'P2025':
            res.clearCookie('access_token');
            res.status(404).json({ data: null });
            return;
          default:
            res.send(err);
        }
      });
  });

export default router;
