import axios from 'axios';
import { object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';

export interface UserChangePasswordContext {}

export interface UserChangePasswordBody {
  password: string;
  new_password: string;
}

export type UserChangePasswordResponse = ResponseBody;

export interface UserChangePasswordAPI
  extends BaseAPI<
    UserChangePasswordContext,
    UserChangePasswordBody,
    UserChangePasswordResponse
  > {}

const changePassword: UserChangePasswordAPI = ({ body }) => {
  return axios.put<UserChangePasswordResponse>('/api/user/password', body);
};

changePassword.validation = object().shape({
  password: string().required(),
  new_password: string()
    .required()
    .test('new_password', function (value) {
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

export default changePassword;
