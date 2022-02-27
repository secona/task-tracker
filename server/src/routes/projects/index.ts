import { Router } from 'express';
import { projectDAO } from '~/core/projects/project.dao';
import {
  ProjectUpdate,
  projectValidation,
} from '~/core/projects/project.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.use('/:projectId/tasks', require('./tasks').default);

router
  .route('/:projectId')
  .all(authenticate)

  .get((req, res) => {
    projectDAO
      .getOne({
        project_id: req.params.projectId,
        user_id: req.accessToken.user_id,
      })
      .then(project => {
        const success = !!project;
        res.status(success ? 200 : 404);
        res.json({ success, data: { project } });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .patch(validateBody(projectValidation.partial()), (req, res) => {
    const data = new ProjectUpdate({ ...(req.parsedBody as ProjectUpdate) });
    projectDAO
      .update(
        {
          project_id: req.params.projectId,
          user_id: req.accessToken.user_id,
        },
        data
      )
      .then(project => {
        const success = !!project;
        res.status(success ? 200 : 404);
        res.json({ success, data: { project } });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .delete((req, res) => {
    projectDAO
      .del({
        project_id: req.params.projectId,
        user_id: req.accessToken.user_id,
      })
      .then(n => {
        console.log(n);
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
