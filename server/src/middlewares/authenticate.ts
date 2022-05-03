import { RequestHandler } from 'express';
import sessionService from '~/services/sessionService';
import { cookieKeys } from '../services/cookieService';

const authenticate: RequestHandler = async (req, res, next) => {
  const sessionId = req.cookies[cookieKeys.SESSION_ID];
  if (!sessionId) return res.status(401).end();

  try {
    const session = await sessionService.get(sessionId);
    if (!session) throw new Error();
    req.session = session;
    next();
  } catch (err) {
    console.error(err);
    res.clearCookie(cookieKeys.SESSION_ID);
    res.status(403).send(err);
  }
};

export default authenticate;
