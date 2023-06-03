import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';

export interface AuthLogoutData {}

export type AuthLogoutResponse = ResponseBody;

export interface AuthLogoutAPI
  extends BaseAPI<AuthLogoutData, AuthLogoutResponse> {}

const logout: AuthLogoutAPI = data => {
  return axios.post<AuthLogoutResponse>('/api/auth/logout', data);
};

export default logout;

