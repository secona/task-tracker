import { RequestHandler } from 'express';
import z from 'zod';

export default (O: z.ZodObject<any>): RequestHandler =>
  (req, res, next) => {
    try {
      const parsed = O.parse(req.body);
      req.parsedBody = parsed;
      next();
    } catch (e) {
      res.send(e);
    }
  };
