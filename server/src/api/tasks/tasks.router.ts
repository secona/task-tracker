import { Router } from 'express';
import { TaskDAO } from './tasks.dao';
import { TaskValidationSchema, TaskInsert, TaskUpdate } from './tasks.schemas';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(TaskValidationSchema),
  (req, res) => {
    const { userId } = req.accessToken;
    TaskDAO.create({
      ...(req.parsedBody as TaskInsert),
      author_id: userId,
    })
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.send(err);
      });
  }
);

// TODO: check ownership middleware
router
  .route('/:taskId')
  .all(authenticate)

  .get((req, res) => {
    const { taskId } = req.params;
    TaskDAO.findById(taskId)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.send(err);
      });
  })

  .patch(validateBody(TaskValidationSchema.partial()), (req, res) => {
    const { taskId } = req.params;
    TaskDAO.updateById(taskId, req.parsedBody as TaskUpdate)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.send(err);
      });
  })

  .delete((req, res) => {
    const { taskId } = req.params;
    TaskDAO.deleteById(taskId)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.send(err);
      });
  });

export default router;
