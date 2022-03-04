import { RequestHandler } from 'express';
import z from 'zod';

export default (O: z.ZodObject<any>): RequestHandler =>
  (req, res, next) => {
    const result = O.safeParse(req.body);

    if (result.success) {
      req.parsedBody = result.data;
      next();
    } else {
      next(result.error);
    }
  };
