import { Router } from 'express';
import { projectDAO } from '~/core/projects/project.dao';
import {
  ProjectInsert,
  projectValidation,
} from '~/core/projects/project.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.get('/', (req, res) => {
  res.sendStatus(501);
});

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

export default router;
