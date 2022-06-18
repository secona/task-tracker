import { Router } from 'express';
import { projectRepository } from '~/core/projects/project.repository';
import { ProjectInsert, projectSchemas } from '~/core/projects/project.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';
import { TaskInsert, taskSchemas } from '~/core/tasks/task.model';
import { taskRepository } from '~/core/tasks/task.repository';
import { projectUtil } from '~/core/projects/project.util';
import { taskUtil } from '~/core/tasks/task.util';

const router = Router();

router.get('/', authenticate, (req, res) => {
  projectRepository
    .getMany({ user_id: req.session.user_id })
    .then(projects => {
      res.status(200).json({
        success: true,
        projects: projectUtil.omitSensitive(projects),
      });
    })
    .catch(err => {
      console.error(err);
      res.json({ err });
    });
});

router.post(
  '/',
  authenticate,
  validateBody(projectSchemas.create),
  (req, res) => {
    projectRepository
      .create({
        ...(req.parsedBody) as ProjectInsert,
        user_id: req.session.user_id,
      })
      .then(project => {
        res.status(201).json({
          success: true,
          project: projectUtil.omitSensitive(project),
        });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  }
);

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
        res.json({ success, project: projectUtil.omitSensitive(project) });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .patch(validateBody(projectSchemas.update), (req, res) => {
    projectRepository
      .update(
        {
          project_id: req.params.projectId,
          user_id: req.session.user_id,
        },
        req.parsedBody
      )
      .then(project => {
        const success = !!project;
        res.status(success ? 200 : 404);
        res.json({ success, project: projectUtil.omitSensitive(project) });
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

router.post(
  '/:projectId/tasks',
  authenticate,
  validateBody(taskSchemas.create),
  (req, res) => {
    taskRepository
      .create(
        req.session.user_id,
        {
          ...(req.parsedBody as TaskInsert),
          project_id: String(req.params.projectId),
        }
      )
      .then(task => {
        res.status(201).json({
          success: true,
          task: taskUtil.omitSensitive(task),
        });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  }
);

export default router;
