import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';

export interface AuthVerifyData {
  token: string;
}

export type AuthVerifyResponse = ResponseBody;

export interface AuthVerifyAPI
  extends BaseAPI<AuthVerifyData, AuthVerifyResponse> {}

const login: AuthVerifyAPI = ({ token }) => {
  return axios.post<AuthVerifyResponse>(`/api/auth/verify/${token}`);
};

export default login;
