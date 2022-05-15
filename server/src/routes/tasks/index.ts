import { Router } from 'express';
import { userRepository } from '~/core/users/user.repository';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router.get('/', authenticate, (req, res) => {
  userRepository.getAllTasks(req.session.user_id)
    .then(tasks => {
      res.status(200).json({
        success: true,
        data: { tasks },
      });
    })
    .catch(err => {
      console.error(err);
      res.json({ err });
    });
});

export default router;
