import { Router } from 'express';
import prisma from '~/lib/prisma';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router
  .route('/me')

  .get(authenticate, async (req, res) => {
    const { userId } = req.accessToken;
    prisma.user
      .findUnique({ where: { userId } })
      .then(data => {
        if (!data) res.clearCookie('access_token');
        res.status(data ? 200 : 404).json({ data });
      })
      .catch(err => res.send(err));
  })

  .delete(authenticate, (req, res) => {
    const { userId } = req.accessToken;
    prisma.user
      .delete({ where: { userId } })
      .then(data => res.clearCookie('access_token').status(200).json({ data }))
      .catch(err => {
        switch (err.code) {
          case 'P2025':
            return res
              .clearCookie('accessToken')
              .status(404)
              .json({ data: null });
          default:
            res.send(err);
        }
      });
  });

export default router;
