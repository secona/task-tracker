import login from './login';
import logout from './logout';
import verify from './verify';

export * from './login';
export * from './logout';
export * from './verify';

export const authAPI = {
  login,
  logout,
  verify,
};
