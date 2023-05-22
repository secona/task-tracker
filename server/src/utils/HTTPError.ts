import { typeToFlattenedError } from 'zod';

type Errors =
  | {
      errType: 'VALIDATION_FAILED';
      details: typeToFlattenedError<{ [x: string]: any }>['fieldErrors'];
    }
  | { errType: 'NOT_LOGGED_IN' }
  | { errType: 'ALREADY_LOGGED_IN' }
  | { errType: 'UNVERIFIED_EMAIL' }
  | { errType: 'TOKEN_EXPIRED' }
  | { errType: 'TOKEN_MALFORMED' }
  | { errType: 'UNKNOWN' };

export class HTTPError {
  constructor(public status: number, public body: Errors) {}
}
