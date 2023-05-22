import { ErrorRequestHandler } from 'express';
import { HTTPError } from '~/utils/HTTPError';
import { logger } from '~/utils/logger';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.status).json(err.body);
  }

  logger.error(
    JSON.stringify(
      {
        method: req.method,
        path: req.path,
        ip: req.ip,
        body: req.body,
        parsedBody: req.parsedBody,
        cookies: req.cookies,
        headers: req.headers,
        params: req.params,
        query: req.query,
        session: req.session,
      },
      null,
      2
    ) +
      '\n----------\n' +
      err.stack,
    { category: 'HTTP' }
  );
  res.status(500).json({ errType: 'UNKNOWN' });
};
