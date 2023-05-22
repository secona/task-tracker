import { RequestHandler } from 'express';
import z from 'zod';
import { HTTPError } from '~/utils/HTTPError';
import isEmptyObject from '~/utils/isEmptyObject';

export default (O: z.ZodObject<any>): RequestHandler =>
  (req, res, next) => {
    const result = O.safeParse(req.body);

    if (result.success) {
      if (isEmptyObject(result.data)) {
        return next(
          new HTTPError(422, { errType: 'VALIDATION_FAILED', details: {} })
        );
      }
      req.parsedBody = result.data;
      next();
    } else {
      next(
        new HTTPError(422, {
          errType: 'VALIDATION_FAILED',
          details: result.error.flatten().fieldErrors,
        })
      );
    }
  };
