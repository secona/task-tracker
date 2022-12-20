import axios from 'axios';
import { SchemaOf, object, string } from 'yup';

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

const validation: SchemaOf<IRegister> = object().shape({
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

const register = async (data: IRegister) => {
  return axios.post('/api/user', data);
}

export default {
  validation,
  register,
};
