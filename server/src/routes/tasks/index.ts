import { Body, Router } from 'express';
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
      res.status(200).json(<Body<['tasks']>>{
        msg: 'SUCCESS',
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
        if (task) {
          res.status(200).json(<Body<['task']>>{
            msg: 'SUCCESS',
            task: taskUtil.omitSensitive(task),
          });
        } else {
          res.status(404).json(<Body>{ msg: 'NOT_FOUND' });
        }
      })
      .catch(err => {
        next(err);
      });
  })

  .patch(validateBody(taskSchemas.update), (req, res, next) => {
    taskRepository
      .update(req.session.user_id, req.params.taskId, req.parsedBody)
      .then(task => {
        if (task) {
          res.status(200).json(<Body<['task']>>{
            msg: 'SUCCESS',
            task: taskUtil.omitSensitive(task),
          });
        } else {
          res.status(404).json(<Body>{ msg: 'NOT_FOUND' });
        }
      })
      .catch(err => {
        next(err);
      });
  })

  .delete((req, res, next) => {
    taskRepository
      .del(req.session.user_id, req.params.taskId)
      .then(n => {
        if (n > 0) {
          res.status(200).json(<Body>{
            msg: 'SUCCESS',
          });
        } else {
          res.status(404).json(<Body>{
            msg: 'NOT_FOUND',
          });
        }
      })
      .catch(err => {
        next(err);
      });
  });

export default router;
