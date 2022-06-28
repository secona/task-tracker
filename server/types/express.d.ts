import { JwtPayload } from 'jsonwebtoken';
import { Session } from '~/services/sessionService';

declare global {
  namespace Express {
    interface Request {
      parsedBody: Record<string, any>;
      sessionId: string;
      session: Session;
    }
  }
}

