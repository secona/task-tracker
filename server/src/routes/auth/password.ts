import { Router } from 'express';
import bcrypt from 'bcrypt';
import { userSchemas } from '~/core/users/user.model';
import { userRepository } from '~/core/users/user.repository';
import validateBody from '~/middlewares/validateBody';
import emailService from '~/services/emailService';
import tokenService from '~/services/tokenService';

const router = Router();

router.post(
  '/reset',
  validateBody(userSchemas.resetPassword),
  async (req, res) => {
    try {
      const decoded = tokenService.forgotPassword.verify(req.body.token);
      if (!decoded) return res.status(400).json({ msg: 'Invalid token' });

      const user = await userRepository.update(
        { email: decoded.email, password: decoded.current_password },
        { password: bcrypt.hashSync(req.body.new_password, 10) }
      );

      if (!user) {
        res.status(400).json({ msg: 'Token no longer usable' });
      } else {
        res.status(200).json({ success: true });
      }
    } catch (err) {
      console.error(err);
      res.json({ err });
    }
  }
);

router.post(
  '/forgot',
  validateBody(userSchemas.forgotPassword),
  async (req, res) => {
    try {
      const user = await userRepository.getOne({ email: req.body.email });
      if (!user) return res.status(400).json({ msg: 'user not found' });
    
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
      console.error(err);
      res.json({ err });
    }
  }
);

export default router;