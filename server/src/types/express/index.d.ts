import { JwtPayload } from 'jsonwebtoken';
import { AccessToken } from '~/lib/tokens';

declare global {
  declare namespace Express {
    interface Request {
      accessToken: JwtPayload & AccessToken;
    }
  }
}
