import { Router } from 'express';
import { taskValidation, TaskInsert, TaskUpdate } from '~/core/tasks/task.model';
import { taskRepository } from '~/core/tasks/task.repository';
import { userRepository } from '~/core/users/user.repository';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router
  .route('/')
  .all(authenticate)

  .get((req, res) => {
    userRepository.getAllTasks(req.session.user_id) // TODO: project specific tasks
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
  })
  
  .post(validateBody(taskValidation), (req, res) => {
    const { projectId } = req.query;

    if (!projectId)
      res.status(400).json({ msg: 'projectId query param required' });

    taskRepository
      .create(
        req.session.user_id,
        {
          ...(req.parsedBody as TaskInsert),
          project_id: String(projectId),
        }
      )
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
  });

router
  .route('/:taskId')
  .all(authenticate)

  .get((req, res) => {
    taskRepository
      .getOne(req.session.user_id, req.params.taskId)
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

  .patch(validateBody(taskValidation.partial()), (req, res) => {
    taskRepository
      .update(
        req.session.user_id,
        req.params.taskId,
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

  .delete((req, res) => {
    taskRepository
      .del(
        req.session.user_id,
        req.params.taskId
      )
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
