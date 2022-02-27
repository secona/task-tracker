import { RequestHandler } from 'express';
import { projectDAO } from '~/core/projects/project.dao';

export default {
  project(req, res, next) {
    projectDAO
      .getOne({
        user_id: req.accessToken.user_id,
        project_id: req.params.projectId,
      })
      .then(project => {
        if (!project)
          return res.status(404).json({
            success: false,
            message: 'This project does not exist',
          });
        next();
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  },
} as Record<'project', RequestHandler>;
