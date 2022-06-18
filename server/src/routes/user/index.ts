import { Router } from 'express';
import bcrypt from 'bcrypt';
import { userRepository } from '~/core/users/user.repository';
import { UserInsert, userSchemas } from '~/core/users/user.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';
import cookieService, { cookieKeys } from '~/services/cookieService';
import emailVerificationService from '~/services/emailVerificationService';
import sessionService from '~/services/sessionService';
import { userUtil } from '~/core/users/user.util';

const router = Router();

router.post('/', validateBody(userSchemas.create), async (req, res) => {
  try {
    const user = await userRepository.create({
      ...(req.parsedBody as UserInsert),
      password: bcrypt.hashSync(req.parsedBody.password, 10),
      verified: false,
    });

    emailVerificationService.sendEmail(user);

    const sessionId = await sessionService.create(user);
    res.cookie(...cookieService.sessionId(sessionId));
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
});

router
  .route('/')
  .all(authenticate)

  .get((req, res) => {
    userRepository
      .getOne({ user_id: req.session.user_id })
      .then(user => {
        const success = !!user;
        res.status(success ? 200 : 404);
        res.json({ success, user: userUtil.omitSensitive(user) });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .delete((req, res) => {
    userRepository
      .del({ user_id: req.session.user_id })
      .then(n => {
        const success = n > 0;
        if (success) res.clearCookie(cookieKeys.SESSION_ID);
        res.status(success ? 200 : 404);
        res.json({ success });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  });

router.patch(
  '/profile',
  authenticate,
  validateBody(userSchemas.updateProfile),
  (req, res) => {
    userRepository
      .update(
        { user_id: req.session.user_id },
        req.parsedBody,
      )
      .then(user => {
        const success = !!user;
        res.status(success ? 200 : 404);
        res.json({ success, user: userUtil.omitSensitive(user) });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      })
  }
);

router.put('/password', (req, res) => {
  res.sendStatus(501);
});

router.put('/email', (req, res) => {
  res.sendStatus(501);
});

export default router;