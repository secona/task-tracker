import { RequestHandler } from 'express';
import sessionService from '~/services/sessionService';
import { cookieKeys } from '../services/cookieService';

const authenticate: RequestHandler = async (req, res, next) => {
  const sessionId = req.cookies[cookieKeys.SESSION_ID];
  if (!sessionId) return res.status(401).end();

  try {
    const session = await sessionService.get(sessionId, req.ip);

    if (!session) {
      res.clearCookie(cookieKeys.SESSION_ID);
      res.status(403).json({ msg: 'You are not logged in' });
    } else {
      req.sessionId = sessionId;
      req.session = session;
      next();
    }
  } catch (err) {
    console.error(err);
    res.send(err);
  }
};

export default authenticate;
