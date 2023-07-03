import register from './register';
import changePassword from './changePassword';
import changeEmail from './changeEmail';

export * from './register';
export * from './changePassword';
export * from './changeEmail';

export const userAPI = {
  register,
  changePassword,
  changeEmail,
};
