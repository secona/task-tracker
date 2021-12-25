import { Router } from 'express';
import { taskDAO } from '~/core/tasks/task.dao';
import { TaskUpdate } from '~/core/tasks/task.model';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router
  .route('/:taskId')
  .all(authenticate)

  .get((req, res) => {
    taskDAO
      .get({ task_id: req.params.taskId })
      .then(task => {
        const success = !!task;
        res.status(success ? 200 : 404);
        res.json({ success, data: { task } });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .patch((req, res) => {
    const data = new TaskUpdate({ ...req.body });
    taskDAO
      .update({ task_id: req.params.taskId }, data)
      .then(task => {
        const success = !!task;
        res.status(success ? 200 : 404);
        res.json({ success, data: { task } });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .delete((req, res) => {
    taskDAO
      .del({ task_id: req.params.taskId })
      .then(n => {
        const success = n > 0;
        res.status(success ? 200 : 404);
        res.json({ success });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  });

export default router;
