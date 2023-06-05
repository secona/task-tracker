import axios from 'axios';
import { BaseAPI, NEW_ResponseBody, NEW_axios } from '..';

export interface AuthLogoutContext {}

export interface AuthLogoutBody {}

export type AuthLogoutResponse = NEW_ResponseBody;

export interface AuthLogoutAPI
  extends BaseAPI<AuthLogoutContext, AuthLogoutBody, AuthLogoutResponse> {}

const logout: AuthLogoutAPI = () => {
  return NEW_axios.post<AuthLogoutResponse>('/api/auth/logout');
};

export default logout;
