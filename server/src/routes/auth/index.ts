import { Router } from 'express';
import bcrypt from 'bcrypt';
import { userRepository } from '~/core/users/user.repository';
import sessionService from '~/services/sessionService';
import cookieService, { cookieKeys } from '~/services/cookieService';

const router = Router();

router.use('/verify', require('./verify').default);
router.use('/password', require('./password').default);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const cookie = req.cookies[cookieKeys.SESSION_ID];

    if (cookie) {
      const session = await sessionService.get(cookie);
  
      if (session) {
        return res.status(400).json({ msg: 'Already logged in' });
      } else {
        res.clearCookie(cookieKeys.SESSION_ID);
      }
    }

    const user = await userRepository.getOne({ email });

    if (!user) return res.status(404).json({ message: 'User does not exist!' });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(400).json({ message: 'Incorrect password!' });

    const sessionId = await sessionService.create(user, req.headers, req.ip);
    res.cookie(...cookieService.sessionId(sessionId));
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
});

router.post('/logout', async (req, res) => {
  const sessionId = req.cookies[cookieKeys.SESSION_ID];

  if (!sessionId) {
    return res.status(400).json({ msg: 'You are not logged in' });
  }

  try {
    await sessionService.del(sessionId);
    res.clearCookie(cookieKeys.SESSION_ID);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
});

export default router;
