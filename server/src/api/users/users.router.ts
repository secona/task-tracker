import { Router } from 'express';
import { UserDAO } from './users.dao';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router
  .route('/me')
  .all(authenticate)

  .get((req, res) => {
    const { userId } = req.accessToken;
    UserDAO.findByIdJoin(userId)
      .then(user => {
        const found = !!user;
        res.status(found ? 200 : 404);
        res.json({ success: found, data: { user } });
      })
      .catch(err => {
        res.send(err);
      });
  })

  .delete((req, res) => {
    const { userId } = req.accessToken;
    UserDAO.deleteById(userId)
      .then(n => {
        const deleted = n > 0;
        if (deleted) res.clearCookie('access_token');
        res.status(deleted ? 200 : 404);
        res.json({ success: deleted });
      })
      .catch(err => {
        res.send(err);
      });
  });

export default router;
