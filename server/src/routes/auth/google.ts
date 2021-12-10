import { Router } from 'express';
import { oauth2, auth } from '@googleapis/oauth2';
import { UserInsert } from '~/core/users/user.model';
import { userDAO } from '~/core/users/user.dao';
import { accessToken } from '~/lib/tokens';
import { accessTokenConfig } from '~/config/cookie';

const router = Router();
const oauth2API = oauth2('v2');
const oauth2Client = new auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: new URL('/api/auth/google/callback', process.env.ROOT_URL).href,
});

router.get('/', (_, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });

  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code as string);
    const { data } = await oauth2API.userinfo.v2.me.get({
      oauth_token: tokens.access_token!,
    });

    const user = new UserInsert({
      email: data.email!,
      name: data.name!,
      picture: data.picture!,
    });

    const created = await userDAO.create(user);
    const at = accessToken.sign({ user_id: created.user_id! });

    res.cookie('access_token', at, accessTokenConfig);
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
