import { Request, Router } from 'express';
import { taskDAO } from '~/core/tasks/task.dao';
import { TaskInsert, taskValidation } from '~/core/tasks/task.model';
import authenticate from '~/middlewares/authenticate';
import authorize from '~/middlewares/authorize';
import validateBody from '~/middlewares/validateBody';

const router = Router({ mergeParams: true });

router
  .route('/')
  .all(authenticate, authorize.project)

  .post(validateBody(taskValidation), (req: Request<any>, res) => {
    taskDAO
      .create({
        ...(req.parsedBody as TaskInsert),
        project_id: req.params.projectId,
      })
      .then(task => {
        res.status(201).json({ data: { task } });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .get((req: Request<any>, res) => {
    taskDAO
      .getMany({ project_id: req.params.projectId })
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
