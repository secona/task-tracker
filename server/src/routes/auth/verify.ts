import { Body, Router } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import tokenService from '~/services/tokenService';
import { userRepository } from '~/core/users/user.repository';
import emailVerificationService from '~/services/emailVerificationService';

const router = Router();

router.post('/', (req, res, next) => {
  const { email } = req.body;
  userRepository
    .getOne({ email })
    .then(user => {
      if (!user) throw new Error();
      emailVerificationService.sendEmail(user);
      res.json(<Body>{ msg: 'SUCCESS' });
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
      res.json(<Body>{ msg: 'SUCCESS' });
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return res.status(400).json(<Body>{ msg: 'TOKEN_MALFORMED' });
    }

    next(err);
  }
});

export default router;
