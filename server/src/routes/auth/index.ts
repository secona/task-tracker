import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '~/lib/db';
import { accessTokenConfig } from '~/config/cookie';
import { UserInsert, userValidation } from '~/core/users/user.model';
import { accessToken } from '~/lib/tokens';
import validateBody from '~/middlewares/validateBody';

const router = Router();

router.use('/verify', require('./verify').default);

router.post('/register', validateBody(userValidation), (req, res) => {
  const data = new UserInsert({
    ...(req.parsedBody as UserInsert),
    verified: false,
  });

  db('users')
    .insert(data)
    .returning('*')
    .onConflict('email')
    .merge()
    .then(data => {
      res
        .cookie(
          'access_token',
          accessToken.sign({ user_id: data[0].user_id }),
          accessTokenConfig
        )
        .status(201)
        .json({ success: true });
    })
    .catch(err => {
      console.error(err);
      res.json({ err });
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  db.select('*')
    .from('users')
    .where({ email })
    .first()
    .then(user => {
      if (!user)
        return res.status(404).json({ message: 'User does not exist!' });

      if (!bcrypt.compareSync(password, user.password))
        return res.status(400).json({ message: 'Incorrect password!' });

      res
        .cookie(
          'access_token',
          accessToken.sign({ user_id: user.user_id }),
          accessTokenConfig
        )
        .status(200)
        .json({ success: true });
    })
    .catch(err => {
      console.error(err);
      res.json({ err });
    });
});

export default router;
