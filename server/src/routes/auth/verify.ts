import { Router } from 'express';
import tokenService from '~/services/tokenService';
import { userRepository } from '~/core/users/user.repository';
import emailVerificationService from '~/services/emailVerificationService';

const router = Router();

router.post('/', (req, res) => {
  const { email } = req.body;
  userRepository
    .getOne({ email })
    .then(user => {
      if (!user) throw new Error();
      emailVerificationService.sendEmail(user);
      res.json({ success: true });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        msg: 'An unexpected error has occurred.',
      });
    });
});

router.post('/:vt', async (req, res) => {
  const { vt } = req.params;

  try {
    const decoded = tokenService.verification.verify(vt);
    if (decoded) {
      await userRepository.update({ email: decoded.email }, { verified: true });
      res.json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: 'An unexpected error has occurred.',
    });
  }
});

export default router;

