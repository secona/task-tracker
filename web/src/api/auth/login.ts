import axios from 'axios';
import { object, SchemaOf, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';

export interface AuthLoginData {
  email: string;
  password: string;
}

export type AuthLoginResponse = ResponseBody;

export interface AuthLoginAPI
  extends BaseAPI<AuthLoginData, AuthLoginResponse> {
  validation: SchemaOf<AuthLoginData>;
}

const login: AuthLoginAPI = data => {
  return axios.post<AuthLoginResponse>('/api/auth/login', data);
};

login.validation = object().shape({
  email: string().required(),
  password: string().required(),
});

export default login;
