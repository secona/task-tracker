import { Router } from 'express';
import bcrypt from 'bcrypt';
import { DatabaseError } from 'pg';
import { userRepository } from '~/core/users/user.repository';
import { UserInsert, userSchemas } from '~/core/users/user.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';
import { cookieKeys } from '~/services/cookieService';
import emailVerificationService from '~/services/emailVerificationService';
import { userUtil } from '~/core/users/user.util';
import sessionService from '~/services/sessionService';
import { HTTPError } from '~/utils/HTTPError';

const router = Router();

router.post('/', validateBody(userSchemas.create), async (req, res, next) => {
  try {
    const user = await userRepository.create({
      ...(req.parsedBody as UserInsert),
      password: bcrypt.hashSync(req.parsedBody.password, 10),
      verified: false,
    });

    emailVerificationService.sendEmail(user);
    res.status(201).json({ success: true });
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.code === '23505') {
        next(
          new HTTPError(422, {
            errType: 'VALIDATION_FAILED',
            details: { email: ['email already taken'] },
          })
        );
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
        const success = !!user;
        res.status(success ? 200 : 404);
        res.json({ success, user: userUtil.omitSensitive(user) });
      })
      .catch(err => {
        next(err);
      });
  })

  .delete((req, res, next) => {
    userRepository
      .del({ user_id: req.session.user_id })
      .then(n => {
        const success = n > 0;
        if (success) res.clearCookie(cookieKeys.SESSION_ID);
        res.status(success ? 200 : 404);
        res.json({ success });
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
        const success = !!user;
        res.status(success ? 200 : 404);
        res.json({ success, user: userUtil.omitSensitive(user) });
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
        await sessionService.delAll(req.session.user_id);
        res.clearCookie(cookieKeys.SESSION_ID);
        return next(new HTTPError(401, { errType: 'NOT_LOGGED_IN' }));
      }

      if (!bcrypt.compareSync(req.body.current_password, user.password))
        return next(
          new HTTPError(403, {
            errType: 'VALIDATION_FAILED',
            details: {
              password: ['incorrect password'],
            },
          })
        );

      await userRepository.update(
        { user_id: req.session.user_id },
        { password: bcrypt.hashSync(req.body.new_password, 10) }
      );

      await sessionService.delAll(user.user_id);
      res.status(200).json({ success: true });
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
        await sessionService.delAll(req.session.user_id);
        res.clearCookie(cookieKeys.SESSION_ID);
        return next(new HTTPError(401, { errType: 'NOT_LOGGED_IN' }));
      }

      await emailVerificationService.sendEmail(user);
      await sessionService.delAll(user.user_id);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
