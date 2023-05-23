import axios from 'axios';
import { object, SchemaOf, string } from 'yup';
import { ResponseBody } from '..';

export interface ILogin {
  email: string;
  password: string;
}

export type LoginResponse = ResponseBody;

const validation: SchemaOf<ILogin> = object().shape({
  email: string().required(),
  password: string().required(),
});

const login = async (data: ILogin) => {
  return axios.post<LoginResponse>('/api/auth/login', data);
};

export default {
  validation,
  login,
};
