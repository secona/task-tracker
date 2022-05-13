import { Router } from 'express';
import { db } from '~/clients';
import { userValidation, UserInsert } from '~/core/users/user.model';
import validateBody from '~/middlewares/validateBody';
import cookieService from '~/services/cookieService';
import emailVerificationService from '~/services/emailVerificationService';
import sessionService from '~/services/sessionService';

const router = Router();

router.use('/me', require('./me').default);

router.post('/', validateBody(userValidation), async (req, res) => {
  const data = new UserInsert({
    ...(req.parsedBody as UserInsert),
    verified: false,
  });

  try {
    const users = await db('users')
      .insert(data)
      .returning('*')
      .onConflict('email')
      .merge();

    emailVerificationService.sendEmail(users[0]);

    const sessionId = await sessionService.create(users[0]);
    res.cookie(...cookieService.sessionId(sessionId));
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
});

export default router;