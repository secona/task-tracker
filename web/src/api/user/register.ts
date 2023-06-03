import axios from 'axios';
import { SchemaOf, object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';

export interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

export type UserRegisterResponse = ResponseBody;

export interface UserRegisterAPI
  extends BaseAPI<UserRegisterData, UserRegisterResponse> {
  validation: SchemaOf<UserRegisterData>;
}

const register: UserRegisterAPI = data => {
  return axios.post<UserRegisterResponse>('/api/user', data);
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
