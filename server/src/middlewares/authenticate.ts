import { RequestHandler } from 'express';
import { verifyAccessToken } from '~/lib/tokens';

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) return res.status(401).end();

  try {
    const decoded = verifyAccessToken(accessToken);
    if (decoded) req.accessToken = decoded;
    next();
  } catch (err) {
    res.clearCookie('access_token');
    res.status(403).send(err);
  }
}

export default authenticate;