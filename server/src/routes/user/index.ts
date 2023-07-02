import { Body, Router } from 'express';
import bcrypt from 'bcrypt';
import { DatabaseError } from 'pg';
import { userRepository } from '~/core/users/user.repository';
import { UserInsert, UserResponse, userSchemas } from '~/core/users/user.model';
import { sessionRepository } from '~/core/sessions/session.repository';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';
import { cookieKeys } from '~/services/cookieService';
import emailVerificationService from '~/services/emailVerificationService';

const router = Router();

router.post('/', validateBody(userSchemas.create), async (req, res, next) => {
  try {
    const user = await userRepository.create({
      ...(req.parsedBody as UserInsert),
      password: bcrypt.hashSync(req.parsedBody.password, 10),
      verified: false,
    });

    emailVerificationService.sendEmail(user);
    res.status(201).json(<Body>{ msg: 'SUCCESS' });
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.code === '23505') {
        res.status(422).json(<Body>{
          msg: 'VALIDATION_FAILED',
          details: { email: ['email already taken'] },
        });
      }
    }

    next(err);
  }
});

router
  .route('/')
  .all(authenticate)

  .get((req, res, next) => {
    userRepository
      .getOne({ user_id: req.session.user_id })
      .then(user => {
        if (user) {
          res.status(200).json(<Body<'user'>>{
            msg: 'SUCCESS',
            user: new UserResponse(user),
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
    userRepository
      .del({ user_id: req.session.user_id })
      .then(n => {
        if (n > 0) {
          res.clearCookie(cookieKeys.SESSION_ID);
          res.status(200).json(<Body>{ msg: 'SUCCESS' });
        } else {
          res.status(404).json(<Body>{ msg: 'NOT_FOUND' });
        }
      })
      .catch(err => {
        next(err);
      });
  });

router.patch(
  '/profile',
  authenticate,
  validateBody(userSchemas.updateProfile),
  (req, res, next) => {
    userRepository
      .update({ user_id: req.session.user_id }, req.parsedBody)
      .then(user => {
        if (user) {
          res.status(200).json(<Body<'user'>>{
            msg: 'SUCCESS',
            user: new UserResponse(user),
          });
        } else {
          res.status(404).json(<Body>{ msg: 'NOT_FOUND' });
        }
      })
      .catch(err => {
        next(err);
      });
  }
);

router.put(
  '/password',
  authenticate,
  validateBody(userSchemas.updatePassword),
  async (req, res, next) => {
    try {
      const user = await userRepository.getOne({
        user_id: req.session.user_id,
      });

      if (!user) {
        await sessionRepository.delAll(req.session.user_id);
        res.clearCookie(cookieKeys.SESSION_ID);
        return res.status(401).json(<Body>{ msg: 'NOT_LOGGED_IN' });
      }

      if (!bcrypt.compareSync(req.body.password, user.password))
        return res.status(403).json(<Body>{
          msg: 'VALIDATION_FAILED',
          details: { password: ['incorrect password'] },
        });

      await userRepository.update(
        { user_id: req.session.user_id },
        { password: bcrypt.hashSync(req.body.new_password, 10) }
      );

      await sessionRepository.delAll(user.user_id);
      res.status(200).json(<Body>{ msg: 'SUCCESS' });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/email',
  authenticate,
  validateBody(userSchemas.updateEmail),
  async (req, res, next) => {
    try {
      const user = await userRepository.update(
        { user_id: req.session.user_id },
        { ...req.parsedBody, verified: false }
      );

      if (!user) {
        await sessionRepository.delAll(req.session.user_id);
        res.clearCookie(cookieKeys.SESSION_ID);
        return res.status(401).json(<Body>{ msg: 'NOT_LOGGED_IN' });
      }

      await emailVerificationService.sendEmail(user);
      await sessionRepository.delAll(user.user_id);
      res.status(200).json(<Body>{ msg: 'SUCCESS' });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
