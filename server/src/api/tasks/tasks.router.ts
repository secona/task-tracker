import { Router } from 'express';
import { TaskDAO } from './tasks.dao';
import { TaskValidationSchema, TaskInsert, TaskUpdate } from './tasks.common';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(TaskValidationSchema),
  (req, res) => {
    const owner_id = req.accessToken.userId;
    const data = req.parsedBody as TaskInsert;

    TaskDAO.create({ ...data, owner_id })
      .then(task => {
        res.status(201).json({ success: true, data: { task } });
      })
      .catch(err => {
        res.send(err);
      });
  }
);

router
  .route('/:taskId')
  .all(authenticate)

  .get((req, res) => {
    TaskDAO.findById(req.accessToken.userId, req.params.taskId)
      .then(task => {
        const found = !!task;
        res.status(found ? 200 : 404);
        res.json({ success: found, data: { task } });
      })
      .catch(err => {
        res.send(err);
      });
  })

  .patch(validateBody(TaskValidationSchema.partial()), (req, res) => {
    TaskDAO.updateById(
      req.accessToken.userId,
      req.params.taskId,
      req.parsedBody as TaskUpdate
    )
      .then(task => {
        const updated = !!task;
        res.status(updated ? 200 : 404);
        res.json({ success: updated, data: { task } });
      })
      .catch(err => {
        res.send(err);
      });
  })

  .delete((req, res) => {
    TaskDAO.deleteById(req.accessToken.userId, req.params.taskId)
      .then(n => {
        const deleted = n > 0;
        res.status(deleted ? 200 : 404);
        res.json({ success: deleted });
      })
      .catch(err => {
        res.send(err);
      });
  });

export default router;
