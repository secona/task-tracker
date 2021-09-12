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
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.send(err);
      })
  })

  .delete((req, res) => {
    const { userId } = req.accessToken;
    UserDAO.deleteById(userId)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.send(err)
      });
  });

export default router;
