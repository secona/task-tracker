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

router.get('/', authenticate, (req, res, next) => {
  projectRepository
    .getMany({ user_id: req.session.user_id })
    .then(projects => {
      res.status(200).json({
        success: true,
        projects: projectUtil.omitSensitive(projects),
      });
    })
    .catch(err => {
      next(err);
    });
});

router.post(
  '/',
  authenticate,
  validateBody(projectSchemas.create),
  (req, res, next) => {
    projectRepository
      .create({
        ...(req.parsedBody as ProjectInsert),
        user_id: req.session.user_id,
      })
      .then(project => {
        res.status(201).json({
          success: true,
          project: projectUtil.omitSensitive(project),
        });
      })
      .catch(err => {
        next(err);
      });
  }
);

router
  .route('/:projectId')
  .all(authenticate)

  .get((req, res, next) => {
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
        next(err);
      });
  })

  .patch(validateBody(projectSchemas.update), (req, res, next) => {
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
        next(err);
      });
  })

  .delete((req, res, next) => {
    projectRepository
      .del({
        project_id: req.params.projectId,
        user_id: req.session.user_id,
      })
      .then(n => {
        const success = n > 0;
        res.status(success ? 200 : 404);
        res.json({ success });
      })
      .catch(err => {
        next(err);
      });
  });

router.post(
  '/:projectId/tasks',
  authenticate,
  validateBody(taskSchemas.create),
  (req, res, next) => {
    taskRepository
      .create(req.session.user_id, {
        ...(req.parsedBody as TaskInsert),
        project_id: String(req.params.projectId),
      })
      .then(task => {
        if (task) {
          res.status(201).json({
            success: true,
            task: taskUtil.omitSensitive(task),
          });
        } else {
          res.status(404).json({
            success: false,
          });
        }
      })
      .catch(err => {
        next(err);
      });
  }
);

export default router;
