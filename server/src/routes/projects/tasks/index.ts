import { Request, Router } from 'express';
import db from '~/db';
import authenticate from '~/middlewares/authenticate';

const router = Router({ mergeParams: true });

router
  .route('/')
  .all(authenticate)

  .post((req, res) => {
    res.sendStatus(501);
  })

  .get((req: Request<any>, res) => {
    db('tasks')
      .select('tasks.*')
      .leftJoin('projects', { 'projects.project_id': 'tasks.project_id' })
      .where({ 'tasks.project_id': req.params.projectId })
      .andWhere({ 'projects.user_id': req.accessToken.user_id })
      .then(tasks => {
        res.json({ data: { tasks } });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
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
