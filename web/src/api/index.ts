export type ResponseBody<Data extends {} = {}> =
  | {
      msg: 'VALIDATION_FAILED';
      details: Record<string, string[]>;
    }
  | { msg: 'NOT_LOGGED_IN' }
  | { msg: 'ALREADY_LOGGED_IN' }
  | { msg: 'UNVERIFIED_EMAIL' }
  | { msg: 'TOKEN_EXPIRED' }
  | { msg: 'TOKEN_MALFORMED' }
  | { msg: 'UNKNOWN' }
  | ({ msg: 'SUCCESS' } & Data)
  | ({ msg: 'NOT_FOUND' } & Record<keyof Data, {}>);
