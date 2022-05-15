import { Router } from 'express';
import { userRepository } from '~/core/users/user.repository';
import { userValidation, UserInsert } from '~/core/users/user.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';
import cookieService, { cookieKeys } from '~/services/cookieService';
import emailVerificationService from '~/services/emailVerificationService';
import sessionService from '~/services/sessionService';

const router = Router();

router.post('/', validateBody(userValidation), async (req, res) => {
  const data = new UserInsert({
    ...(req.parsedBody as UserInsert),
    verified: false,
  });

  try {
    const user = await userRepository.create(data);

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
      .getOne({ user_id: req.session.user_id }, { complete: false })
      .then(user => {
        const success = !!user;
        res.status(success ? 200 : 404);
        res.json({ success, data: { user } });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  // TODO: patch route

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

export default router;