import { Body, RequestHandler } from 'express';
import { sessionRepository } from '~/core/sessions/session.repository';
import { cookieKeys } from '~/services/cookieService';

const authenticate: RequestHandler = async (req, res, next) => {
  const sessionId = req.cookies[cookieKeys.SESSION_ID];
  if (!sessionId) return res.status(401).json(<Body>{ msg: 'NOT_LOGGED_IN' });

  try {
    const session = await sessionRepository.get(sessionId);
    await sessionRepository.update(sessionId, req.ip);

    if (!session) {
      res.clearCookie(cookieKeys.SESSION_ID);
      res.status(403).json(<Body>{ msg: 'NOT_LOGGED_IN' });
    } else {
      req.sessionId = sessionId;
      req.session = session;
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default authenticate;
