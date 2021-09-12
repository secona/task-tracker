import { Router } from 'express';
import { auth, oauth2 } from '@googleapis/oauth2';
import { accessTokenConfig } from '~/config/cookie';
import { signAccessToken } from '~/lib/tokens';
import { UserDAO } from '~/api/users/users.dao';

const router = Router();
const oauth = oauth2('v2');
const oauthClient = new auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.ROOT_URL + '/api/auth/google/callback',
});

router.get('/', (_, res) => {
  const url = oauthClient.generateAuthUrl({
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
    const { tokens } = await oauthClient.getToken(code as string);
    const { data } = await oauth.userinfo.v2.me.get({
      oauth_token: tokens.access_token!,
    });

    const user = {
      email: data.email!,
      name: data.name!,
      picture: data.picture!,
    };

    const created = await UserDAO.upsert(user);
    const accessToken = signAccessToken({ userId: created.user_id });

    res.cookie('access_token', accessToken, accessTokenConfig);
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.redirect('/login?failed=true');
  }
});

export default router;