import { Router } from 'express';
import bcrypt from 'bcrypt';
import { userSchemas } from '~/core/users/user.model';
import { userRepository } from '~/core/users/user.repository';
import validateBody from '~/middlewares/validateBody';
import sessionService from '~/services/sessionService';
import emailService from '~/services/emailService';
import tokenService from '~/services/tokenService';
import { JsonWebTokenError } from 'jsonwebtoken';
import { HTTPError } from '~/utils/HTTPError';

const router = Router();

router.post(
  '/reset',
  validateBody(userSchemas.resetPassword),
  async (req, res, next) => {
    try {
      const decoded = tokenService.forgotPassword.verify(req.body.token);
      if (!decoded) throw new HTTPError(400, { errType: 'TOKEN_MALFORMED' });

      const user = await userRepository.update(
        { email: decoded.email, password: decoded.current_password },
        { password: bcrypt.hashSync(req.body.new_password, 10) }
      );

      if (!user) {
        next(new HTTPError(400, { errType: 'TOKEN_EXPIRED' }));
      } else {
        await sessionService.delAll(user.user_id);
        res.status(200).json({ success: true });
      }
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        return next(new HTTPError(400, { errType: 'TOKEN_MALFORMED' }));
      }

      next(err);
    }
  }
);

router.post(
  '/forgot',
  validateBody(userSchemas.forgotPassword),
  async (req, res, next) => {
    try {
      const user = await userRepository.getOne({ email: req.body.email });
      if (!user)
        return next(
          new HTTPError(400, {
            errType: 'VALIDATION_FAILED',
            details: { email: ['account does not exist'] },
          })
        );

      const token = tokenService.forgotPassword.sign({
        email: user.email,
        current_password: user.password,
      });

      emailService.sendTemplate({
        templateName: 'forgot-password',
        to: user.email,
        props: {
          name: user.name,
          url: `${process.env.FRONTEND_ROOT_URL}/forgot-password?token=${token}`,
        },
      });

      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
