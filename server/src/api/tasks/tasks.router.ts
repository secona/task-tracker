import { Router } from 'express';
import authenticate from '~/middlewares/authenticate';
import { TaskDAL } from './tasks.dal';

const router = Router();

router.post('/', authenticate, (req, res) => {
  const { userId } = req.accessToken;
  TaskDAL.create({
    author_id: userId,
    task: String(req.body.task),
  })
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

// TODO: check ownership middleware
router
  .route('/:taskId')
  .all(authenticate)

  .get((req, res) => {
    const { taskId } = req.params;
    TaskDAL.findById(taskId)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.send(err);
      });
  })

  .patch((req, res) => {
    const { taskId } = req.params;
    TaskDAL.updateById(taskId, req.body)
      .then(data => {
        res.json({ data: data[0] });
      })
      .catch(err => {
        res.send(err);
      });
  })

  .delete((req, res) => {
    const { taskId } = req.params;
    TaskDAL.deleteById(taskId)
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res.send(err);
      });
  });

export default router;
