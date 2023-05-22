import { Router } from 'express';
import { taskSchemas } from '~/core/tasks/task.model';
import { taskRepository } from '~/core/tasks/task.repository';
import { taskUtil } from '~/core/tasks/task.util';
import { userRepository } from '~/core/users/user.repository';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.get('/', authenticate, (req, res, next) => {
  userRepository
    .getAllTasks(req.session.user_id, req.query)
    .then(tasks => {
      res.status(200).json({
        success: true,
        tasks: taskUtil.omitSensitive(tasks),
      });
    })
    .catch(err => {
      next(err);
    });
});

router
  .route('/:taskId')
  .all(authenticate)

  .get((req, res, next) => {
    taskRepository
      .getOne(req.session.user_id, req.params.taskId)
      .then(task => {
        res.status(task ? 200 : 404);
        res.json({
          success: !!task,
          task: taskUtil.omitSensitive(task),
        });
      })
      .catch(err => {
        next(err);
      });
  })

  .patch(validateBody(taskSchemas.update), (req, res, next) => {
    taskRepository
      .update(req.session.user_id, req.params.taskId, req.parsedBody)
      .then(task => {
        res.status(task ? 200 : 404);
        res.json({
          success: !!task,
          task: taskUtil.omitSensitive(task),
        });
      })
      .catch(err => {
        next(err);
      });
  })

  .delete((req, res, next) => {
    taskRepository
      .del(req.session.user_id, req.params.taskId)
      .then(n => {
        const success = n > 0;
        res.status(success ? 200 : 404);
        res.json({ success });
      })
      .catch(err => {
        next(err);
      });
  });

export default router;

