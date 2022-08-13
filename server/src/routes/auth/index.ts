import { Router } from 'express';
import bcrypt from 'bcrypt';
import { userRepository } from '~/core/users/user.repository';
import sessionService from '~/services/sessionService';
import cookieService, { cookieKeys } from '~/services/cookieService';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router.use('/verify', require('./verify').default);
router.use('/password', require('./password').default);

/*
- Have to be logged out (no `session_id` cookie and no session in redis)
- if !cookie (user is logged out) -> continue (BEST SCENARIO)
- if cookie and !redis (user remote logged out) -> clear cookie and continue
- if cookie and redis (user is logged in) -> error 
*/
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

    if (!user) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: 'You need to verify your email!',
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }

    const sessionId = await sessionService.create(user, req.headers, req.ip);
    res.cookie(...cookieService.sessionId(sessionId));
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: 'An unexpected error has occurred.',
    });
  }
});

/*
- Have to be logged in (a cookie and a session in redis)
- if !cookie (user is logged out) -> error
- if cookie and !redis (user remotely logged out) -> clear cookie and error
- if cookie and redis (user is logged in) -> clear cookie and session (BEST SCENARIO)
*/
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
    res.status(500).json({
      msg: 'An unexpected error has occurred.',
    });
  }
});

router.get('/sessions', authenticate, async (req, res) => {
  try {
    const sessions = await sessionService.getAll(req.session.user_id);
    res.status(200).json({ sessions: sessions.documents });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: 'An unexpected error has occurred.',
    });
  }
});

export default router;
