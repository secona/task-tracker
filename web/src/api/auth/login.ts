import axios from 'axios';
import { object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';

export interface AuthLoginContext {}

export interface AuthLoginBody {
  email: string;
  password: string;
}

export type AuthLoginResponse = ResponseBody;

export interface AuthLoginAPI
  extends BaseAPI<AuthLoginContext, AuthLoginBody, AuthLoginResponse> {}

const login: AuthLoginAPI = ({ body }) => {
  return axios.post<AuthLoginResponse>('/api/auth/login', body);
};

login.validation = object().shape({
  email: string().required(),
  password: string().required(),
});

export default login;
