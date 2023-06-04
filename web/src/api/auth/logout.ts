import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';

export interface AuthLogoutContext {}

export interface AuthLogoutBody {}

export type AuthLogoutResponse = ResponseBody;

export interface AuthLogoutAPI
  extends BaseAPI<AuthLogoutContext, AuthLogoutBody, AuthLogoutResponse> {}

const logout: AuthLogoutAPI = () => {
  return axios.post<AuthLogoutResponse>('/api/auth/logout');
};

export default logout;
