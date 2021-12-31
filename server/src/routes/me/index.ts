import { Router } from 'express';
import { userDAO } from '~/core/users/user.dao';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router.use('/projects', require('./projects').default);
router.use('/tasks', require('./tasks').default);

router
  .route('/')
  .all(authenticate)

  .get((req, res) => {
    userDAO
      .getOne({ user_id: req.accessToken.user_id })
      .then(user => {
        const success = !!user;
        res.status(success ? 200 : 404);
        res.json({ success, data: { user } });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .patch((req, res) => {
    res.sendStatus(501);
  })

  .delete((req, res) => {
    userDAO
      .del({ user_id: req.accessToken.user_id })
      .then(n => {
        const success = n > 0;
        if (success) res.clearCookie('access_token');
        res.status(success ? 200 : 404);
        res.json({ success });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  });

export default router;
