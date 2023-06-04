import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';

export interface AuthVerifyContext {
  token: string;
}

export interface AuthVerifyBody {}

export type AuthVerifyResponse = ResponseBody;

export interface AuthVerifyAPI
  extends BaseAPI<AuthVerifyContext, AuthVerifyBody, AuthVerifyResponse> {}

const login: AuthVerifyAPI = ({ context }) => {
  return axios.post<AuthVerifyResponse>(`/api/auth/verify/${context.token}`);
};

export default login;
