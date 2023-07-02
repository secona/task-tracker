import register from './register';
import changePassword from './changePassword';

export * from './register';
export * from './changePassword';

export const userAPI = {
  register,
  changePassword,
};
