import { RequestHandler } from 'express';
import sessionService from '~/services/sessionService';
import { cookieKeys } from '../services/cookieService';
import { HTTPError } from '~/utils/HTTPError';

const authenticate: RequestHandler = async (req, res, next) => {
  const sessionId = req.cookies[cookieKeys.SESSION_ID];
  if (!sessionId) return next(new HTTPError(401, { errType: 'NOT_LOGGED_IN' }));

  try {
    const session = await sessionService.get(sessionId, req.ip);

    if (!session) {
      res.clearCookie(cookieKeys.SESSION_ID);
      next(new HTTPError(403, { errType: 'NOT_LOGGED_IN' }));
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
