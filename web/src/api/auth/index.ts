import login from './login';
import logout from './logout';
import sessions from './sessions';
import verify from './verify';

export * from './login';
export * from './logout';
export * from './sessions';
export * from './verify';

export interface Session {
  id: string;
  value: {
    ip: string;
    client: string;
    last_activity: {
      date: number;
      loc: string;
    };
    signed_in: {
      date: number;
      loc: string;
    };
  };
}

export const authAPI = {
  login,
  logout,
  sessions,
  verify,
};
