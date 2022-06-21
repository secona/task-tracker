import { RequestHandler } from 'express';
import z from 'zod';
import isEmptyObject from '~/utils/isEmptyObject';

export default (O: z.ZodObject<any>): RequestHandler =>
  (req, res, next) => {
    try {
      const parsed = O.parse(req.body);

      if (isEmptyObject(parsed)) {
        return res.status(400).json({ msg: 'Empty update' })
      }

      req.parsedBody = parsed;
      next();
    } catch (e) {
      res.send(e);
    }
  };
