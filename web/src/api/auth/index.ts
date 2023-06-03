import login from './login';
import verify from './verify';

export * from './login';
export * from './verify';

export const authAPI = {
  login,
  verify,
};
