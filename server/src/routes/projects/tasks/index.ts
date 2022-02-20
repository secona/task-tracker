import { Request, Router } from 'express';
import { taskDAO } from '~/core/tasks/task.dao';
import {
  TaskInsert,
  TaskUpdate,
  taskValidation,
} from '~/core/tasks/task.model';
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
        res.status(201).json({
          success: true,
          data: { task },
        });
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
        res.json({
          success: true,
          data: { tasks },
        });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  });

router
  .route('/:taskId')
  .all(authenticate, authorize.project)

  .get((req: Request<any>, res) => {
    taskDAO
      .getOne({
        task_id: req.params.taskId,
        project_id: req.params.projectId,
      })
      .then(task => {
        res.status(task ? 200 : 404)
        res.json({
          success: !!task,
          data: { task },
        });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .patch(validateBody(taskValidation.partial()), (req: Request<any>, res) => {
    taskDAO
      .update(
        {
          task_id: req.params.taskId,
          project_id: req.params.projectId,
        },
        req.parsedBody as TaskUpdate
      )
      .then(task => {
        res.status(task ? 200 : 404);
        res.json({
          success: !!task,
          data: { task },
        });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .delete((req: Request<any>, res) => {
    taskDAO
      .del({
        task_id: req.params.taskId,
        project_id: req.params.projectId,
      })
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
