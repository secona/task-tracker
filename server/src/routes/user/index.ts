import { Router } from 'express';
import bcrypt from 'bcrypt';
import { DatabaseError } from 'pg';
import { userRepository } from '~/core/users/user.repository';
import { UserInsert, userSchemas } from '~/core/users/user.model';
import authenticate from '~/middlewares/authenticate';
import validateBody from '~/middlewares/validateBody';
import { cookieKeys } from '~/services/cookieService';
import emailVerificationService from '~/services/emailVerificationService';
import { userUtil } from '~/core/users/user.util';
import sessionService from '~/services/sessionService';

const router = Router();

router.post('/', validateBody(userSchemas.create), async (req, res) => {
  try {
    const user = await userRepository.create({
      ...(req.parsedBody as UserInsert),
      password: bcrypt.hashSync(req.parsedBody.password, 10),
      verified: false,
    });

    emailVerificationService.sendEmail(user);
    res.status(201).json({ success: true });
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.code === '23505') {
        return res.status(422).json({ msg: 'Email already exists!' });
      }
    }

    console.error(err);
    res.json({ err });
  }
});

router
  .route('/')
  .all(authenticate)

  .get((req, res) => {
    userRepository
      .getOne({ user_id: req.session.user_id })
      .then(user => {
        const success = !!user;
        res.status(success ? 200 : 404);
        res.json({ success, user: userUtil.omitSensitive(user) });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  })

  .delete((req, res) => {
    userRepository
      .del({ user_id: req.session.user_id })
      .then(n => {
        const success = n > 0;
        if (success) res.clearCookie(cookieKeys.SESSION_ID);
        res.status(success ? 200 : 404);
        res.json({ success });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  });

router.patch(
  '/profile',
  authenticate,
  validateBody(userSchemas.updateProfile),
  (req, res) => {
    userRepository
      .update({ user_id: req.session.user_id }, req.parsedBody)
      .then(user => {
        const success = !!user;
        res.status(success ? 200 : 404);
        res.json({ success, user: userUtil.omitSensitive(user) });
      })
      .catch(err => {
        console.error(err);
        res.json({ err });
      });
  }
);

router.put(
  '/password',
  authenticate,
  validateBody(userSchemas.updatePassword),
  async (req, res) => {
    try {
      const user = await userRepository.getOne({
        user_id: req.session.user_id,
      });

      if (!user) return res.status(404).json({ msg: 'user not found' });

      if (!bcrypt.compareSync(req.body.current_password, user.password))
        return res.status(403).json({ msg: 'incorrect password' });

      await userRepository.update(
        { user_id: req.session.user_id },
        { password: bcrypt.hashSync(req.body.new_password, 10) }
      );

      await sessionService.delAll(user.user_id);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      res.json({ err });
    }
  }
);

router.put(
  '/email',
  authenticate,
  validateBody(userSchemas.updateEmail),
  async (req, res) => {
    try {
      const user = await userRepository.update(
        { user_id: req.session.user_id },
        { ...req.parsedBody, verified: false }
      );

      if (!user) return res.status(404).json({ msg: 'user not found' });

      await emailVerificationService.sendEmail(user);
      await sessionService.delAll(user.user_id);
      res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ err });
    }
  }
);

export default router;
