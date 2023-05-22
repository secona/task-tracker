import { Router } from 'express';
import bcrypt from 'bcrypt';
import { userRepository } from '~/core/users/user.repository';
import sessionService from '~/services/sessionService';
import cookieService, { cookieKeys } from '~/services/cookieService';
import authenticate from '~/middlewares/authenticate';
import { HTTPError } from '~/utils/HTTPError';

const router = Router();

router.use('/verify', require('./verify').default);
router.use('/password', require('./password').default);

/*
- Have to be logged out (no `session_id` cookie and no session in redis)
- if !cookie (user is logged out) -> continue (BEST SCENARIO)
- if cookie and !redis (user remote logged out) -> clear cookie and continue
- if cookie and redis (user is logged in) -> error 
*/
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const cookie = req.cookies[cookieKeys.SESSION_ID];

    if (cookie) {
      const session = await sessionService.get(cookie);

      if (session) {
        next(new HTTPError(400, { errType: 'ALREADY_LOGGED_IN' }));
      } else {
        res.clearCookie(cookieKeys.SESSION_ID);
      }
    }

    const user = await userRepository.getOne({ email });

    if (!user) {
      return next(
        new HTTPError(404, {
          errType: 'VALIDATION_FAILED',
          details: {
            email: ['account does not exist'],
          },
        })
      );
    }

    if (!user.verified) {
      return next(new HTTPError(403, { errType: 'UNVERIFIED_EMAIL' }));
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return next(
        new HTTPError(400, {
          errType: 'VALIDATION_FAILED',
          details: { password: ['incorrect password'] },
        })
      );
    }

    const sessionId = await sessionService.create(user, req.headers, req.ip);
    res.cookie(...cookieService.sessionId(sessionId));
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

/*
- Have to be logged in (a cookie and a session in redis)
- if !cookie (user is logged out) -> error
- if cookie and !redis (user remotely logged out) -> clear cookie and error
- if cookie and redis (user is logged in) -> clear cookie and session (BEST SCENARIO)
*/
router.post('/logout', async (req, res, next) => {
  const sessionId = req.cookies[cookieKeys.SESSION_ID];

  if (!sessionId) {
    return next(new HTTPError(400, { errType: 'NOT_LOGGED_IN' }));
  }

  try {
    await sessionService.del(sessionId);
    res.clearCookie(cookieKeys.SESSION_ID);
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.get('/sessions', authenticate, async (req, res, next) => {
  try {
    const sessions = await sessionService.getAll(req.session.user_id);
    res.status(200).json({ sessions: sessions.documents });
  } catch (err) {
    next(err);
  }
});

export default router;
