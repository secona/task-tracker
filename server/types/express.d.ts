import { JwtPayload } from 'jsonwebtoken';
import { Session } from '~/core/sessions/session.model';

declare global {
  namespace Express {
    interface Request {
      parsedBody: Record<string, any>;
      sessionId: string;
      session: Session;
    }
  }
}

declare module 'express' {
  type Body<Keys extends string = void> =
    | {
        msg: 'VALIDATION_FAILED';
        details: typeToFlattenedError<{ [x: string]: any }>['fieldErrors'];
      }
    | { msg: 'NOT_LOGGED_IN' }
    | { msg: 'ALREADY_LOGGED_IN' }
    | { msg: 'UNVERIFIED_EMAIL' }
    | { msg: 'TOKEN_EXPIRED' }
    | { msg: 'TOKEN_MALFORMED' }
    | { msg: 'UNKNOWN' }
    | ({ msg: 'SUCCESS' } & Record<Keys, any>)
    | ({ msg: 'NOT_FOUND' } & Record<Keys, {}>);
}
