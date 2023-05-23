import { Body, ErrorRequestHandler } from 'express';
import { logger } from '~/utils/logger';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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
  res.status(500).json(<Body>{ msg: 'UNKNOWN' });
};
