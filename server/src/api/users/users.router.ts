import { Router } from 'express';
import { UserDAL } from './users.dal';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router
  .route('/me')
  .all(authenticate)

  .get((req, res) => {
    const { userId } = req.accessToken;
    UserDAL.findByIdJoin(userId)
      .then(data => {
        console.log(data);
        res.json({ data });
      })
      .catch(err => {
        res.send(err);
      })
  })

  .delete((req, res) => {
    const { userId } = req.accessToken;
    UserDAL.deleteById(userId)
      .then(data => {
        res.json({ data });
      })
      .catch(err => res.send(err));
  });

export default router;
