import { Router } from 'express';
import bcrypt from 'bcrypt';
import { db } from '~/clients';
import { UserInsert, userValidation } from '~/core/users/user.model';
import validateBody from '~/middlewares/validateBody';
import sessionService from '~/services/sessionService';
import cookieService from '~/services/cookieService';

const router = Router();

router.use('/verify', require('./verify').default);

router.post('/register', validateBody(userValidation), async (req, res) => {
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

    // verify email process

    const sessionId = await sessionService.create(users[0]);
    res.cookie(...cookieService.sessionId(sessionId));
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.select('*').from('users').where({ email }).first();

    if (!user) return res.status(404).json({ message: 'User does not exist!' });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(400).json({ message: 'Incorrect password!' });

    const sessionId = await sessionService.create(user);
    res.cookie(...cookieService.sessionId(sessionId));
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
});

export default router;
