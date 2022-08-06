import { RequestHandler } from 'express';
import z from 'zod';
import isEmptyObject from '~/utils/isEmptyObject';

export default (O: z.ZodObject<any>): RequestHandler =>
  (req, res, next) => {
    const result = O.safeParse(req.body);

    if (result.success) {
      if (isEmptyObject(result.data)) {
        return res.status(422).json({ msg: 'Empty update' });
      }
      req.parsedBody = result.data;
      next();
    } else {
      res.status(422).json({
        validationErrors: result.error.flatten().fieldErrors,
      });
    }
  };
