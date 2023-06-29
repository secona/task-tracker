import { Body, Router } from 'express';
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
      res.status(200).json(<Body<'projects'>>{
        msg: 'SUCCESS',
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
        res.status(201).json(<Body<'project'>>{
          msg: 'SUCCESS',
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
        if (project) {
          res.status(200).json(<Body<'project'>>{
            msg: 'SUCCESS',
            project: projectUtil.omitSensitive(project),
          });
        } else {
          res.status(400).json(<Body>{
            msg: 'NOT_FOUND',
          });
        }
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
        if (project) {
          res.status(200).json(<Body<'project'>>{
            msg: 'SUCCESS',
            project: projectUtil.omitSensitive(project),
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
  })

  .delete((req, res, next) => {
    projectRepository
      .del({
        project_id: req.params.projectId,
        user_id: req.session.user_id,
      })
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
          res.status(201).json(<Body<'task'>>{
            msg: 'SUCCESS',
            task: taskUtil.omitSensitive(task),
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
  }
);

export default router;
