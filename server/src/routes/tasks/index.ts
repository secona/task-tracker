import { Router } from 'express';
import { taskSchemas } from '~/core/tasks/task.model';
import { taskRepository } from '~/core/tasks/task.repository';
import { taskUtil } from '~/core/tasks/task.util';
import { userRepository } from '~/core/users/user.repository';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.get('/', authenticate, (req, res) => {
  userRepository
    .getAllTasks(req.session.user_id, req.query)
    .then(tasks => {
      res.status(200).json({
        success: true,
        tasks: taskUtil.omitSensitive(tasks),
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        msg: 'An unexpected error has occurred.',
      });
    });
});

router
  .route('/:taskId')
  .all(authenticate)

  .get((req, res) => {
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
        console.error(err);
        res.status(500).json({
          msg: 'An unexpected error has occurred.',
        });
      });
  })

  .patch(validateBody(taskSchemas.update), (req, res) => {
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
        console.error(err);
        res.status(500).json({
          msg: 'An unexpected error has occurred.',
        });
      });
  })

  .delete((req, res) => {
    taskRepository
      .del(req.session.user_id, req.params.taskId)
      .then(n => {
        const success = n > 0;
        res.status(success ? 200 : 404);
        res.json({ success });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          msg: 'An unexpected error has occurred.',
        });
      });
  });

export default router;

