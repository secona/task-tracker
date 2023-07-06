import register from './register';
import changePassword from './changePassword';
import changeEmail from './changeEmail';
import get from './get';

export * from './register';
export * from './changePassword';
export * from './changeEmail';
export * from './get';

export interface IUser {
  user_id: number;
  email: string;
  password: string;
  name: string;
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export const userAPI = {
  register,
  changePassword,
  changeEmail,
  get,
};
