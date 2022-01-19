import { Router } from 'express';
import db from '~/db';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router.get('/', authenticate, (req, res) => {
  db('tasks')
    .select('tasks.*')
    .leftJoin('projects', { 'projects.project_id': 'tasks.project_id' })
    .where({ 'projects.user_id': req.accessToken.user_id })
    .then(tasks => {
      res.status(200).json({ data: { tasks } });
    })
    .catch(err => {
      console.error(err);
      res.json({ err });
    });
});

export default router;
