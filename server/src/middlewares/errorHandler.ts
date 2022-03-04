import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export default <ErrorRequestHandler>((err, req, res, next) => {
  if (err instanceof ZodError) {
    const { fieldErrors } = err.flatten(i => i.message);
    return res.status(422).json({
      success: false,
      validation_errors: fieldErrors,
    });
  }

  res.status(500).send(String(err));
});
