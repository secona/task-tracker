import { Router } from 'express';
import tokenService from '~/services/tokenService';
import { userDAO } from '~/core/users/user.dao';
import emailVerificationService from '~/services/emailVerificationService';

const router = Router();

router.post('/', (req, res) => {
  const { email } = req.body;
  userDAO
    .getOne({ email })
    .then(user => {
      if (!user) throw new Error();
      emailVerificationService.sendEmail(user);
      res.send('Sent email!');
    })
    .catch(err => {
      console.error(err);
      res.json({ err });
    });
});

router.get('/:vt', async (req, res) => {
  const { vt } = req.params;

  try {
    const decoded = tokenService.verification.verify(vt);
    if (decoded) {
      // @ts-ignore
      await userDAO.update({ email: decoded.email }, { verified: true });
      res.json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.json({ err });
  }
});

export default router;

