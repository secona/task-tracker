import { Router } from 'express';
import { projectDAO } from '~/core/projects/project.dao';
import {
  ProjectInsert,
  ProjectUpdate,
  projectValidation,
} from '~/core/projects/project.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.post('/', authenticate, validateBody(projectValidation), (req, res) => {
  const data = new ProjectInsert({
    ...(req.parsedBody as ProjectInsert),
    user_id: req.accessToken.user_id,
  });

  projectDAO
    .create(data)
    .then(project => {
      res.status(201).json({
        success: true,
        data: { project },
      });
    })
    .catch(err => {
      console.error(err);
      res.json({ err });
    });
});

router
  .route('/:projectId')
  .all(authenticate)

  .get((req, res) => {
    projectDAO
      .get({
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

  .patch((req, res) => {
    const data = new ProjectUpdate({ ...req.body });
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
