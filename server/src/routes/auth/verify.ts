import { Router } from 'express';
import tokenService from '~/services/tokenService';
import { userRepository } from '~/core/users/user.repository';
import emailVerificationService from '~/services/emailVerificationService';
import { JsonWebTokenError } from 'jsonwebtoken';
import { HTTPError } from '~/utils/HTTPError';

const router = Router();

router.post('/', (req, res, next) => {
  const { email } = req.body;
  userRepository
    .getOne({ email })
    .then(user => {
      if (!user) throw new Error();
      emailVerificationService.sendEmail(user);
      res.json({ success: true });
    })
    .catch(err => {
      next(err);
    });
});

router.post('/:vt', async (req, res, next) => {
  const { vt } = req.params;

  try {
    const decoded = tokenService.verification.verify(vt);
    if (decoded) {
      await userRepository.update({ email: decoded.email }, { verified: true });
      res.json({ success: true });
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return next(new HTTPError(400, { errType: 'TOKEN_MALFORMED' }));
    }

    next(err);
  }
});

export default router;
