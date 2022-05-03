import { JwtPayload } from 'jsonwebtoken';
import { AccessToken } from '~/lib/tokens';
import { Session } from '~/services/sessionService';

declare global {
  namespace Express {
    interface Request {
      parsedBody: Record<string, any>;
      session: Session;
    }
  }
}
