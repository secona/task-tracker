import axios from 'axios';
import { object, string } from 'yup';
import { BaseAPI, NEW_ResponseBody, NEW_axios } from '..';

export interface UserRegisterContext {}

export interface UserRegisterBody {
  name: string;
  email: string;
  password: string;
}

export type UserRegisterResponse = NEW_ResponseBody;

export interface UserRegisterAPI
  extends BaseAPI<
    UserRegisterContext,
    UserRegisterBody,
    UserRegisterResponse
  > {}

const register: UserRegisterAPI = ({ body }) => {
  return NEW_axios.post<UserRegisterResponse>('/api/user', body);
};

register.validation = object().shape({
  name: string().required(),
  email: string().required().email(),
  password: string()
    .required()
    .test('password', function (value) {
      if (!value) return false;

      const errors: string[] = [];

      if (value.length < 8) {
        errors.push('must be at least 8 characters long');
      }

      if (!/[A-Z]/.test(value)) {
        errors.push('must contain an uppercase letter');
      }

      if (!/[a-z]/.test(value)) {
        errors.push('must contain an lowercase letter');
      }

      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
        errors.push('must contain a special character');
      }

      if (!/[0-9]/.test(value)) {
        errors.push('must contain a number');
      }

      if (errors.length === 0) {
        return true;
      } else {
        return this.createError({
          message: errors.join('|'),
        });
      }
    }),
});

export default register;
