import { Router } from 'express';
import { projectRepository } from '~/core/projects/project.repository';
import {
  ProjectInsert,
  ProjectUpdate,
  projectValidation,
} from '~/core/projects/project.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.use('/:projectId/tasks', require('./tasks').default);

router.get('/', authenticate, (req, res) => {
  projectRepository
    .getMany({ user_id: req.session.user_id })
    .then(projects => {
      res.status(200).json({ success: true, data: { projects } });
    })
    .catch(err => {
      console.error(err);
      res.json({ err });
    });
});

router.post('/', authenticate, validateBody(projectValidation), (req, res) => {
  const data = new ProjectInsert({
    ...(req.parsedBody as ProjectInsert),
    user_id: req.session.user_id,
  });

  projectRepository
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
    projectRepository
      .getOne({
        project_id: req.params.projectId,
        user_id: req.session.user_id,
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
    projectRepository
      .update(
        {
          project_id: req.params.projectId,
          user_id: req.session.user_id,
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
    projectRepository
      .del({
        project_id: req.params.projectId,
        user_id: req.session.user_id,
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
