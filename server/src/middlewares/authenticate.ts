import { RequestHandler } from 'express';
import { accessToken } from '~/lib/tokens';

const authenticate: RequestHandler = (req, res, next) => {
  const accessTokenCookie = req.cookies.access_token;
  if (!accessTokenCookie) return res.status(401).end();

  try {
    const decoded = accessToken.verify(accessTokenCookie);
    if (decoded) req.accessToken = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.clearCookie('access_token');
    res.status(403).send(err);
  }
};

export default authenticate;
