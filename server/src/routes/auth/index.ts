import { Router } from 'express';
import bcrypt from 'bcrypt';
import { db } from '~/clients';
import sessionService from '~/services/sessionService';
import cookieService, { cookieKeys } from '~/services/cookieService';

const router = Router();

router.use('/verify', require('./verify').default);

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

router.post('/logout', async (req, res) => {
  const sessionId = req.cookies[cookieKeys.SESSION_ID];

  try {
    const success = await sessionService.del(sessionId);
    if (success) {
      res.clearCookie(cookieKeys.SESSION_ID);
      res.status(200).json({ success });
    } else {
      res.status(400).json({ success });
    }
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
});

export default router;
