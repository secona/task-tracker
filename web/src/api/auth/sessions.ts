import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';
import { Session } from '.';

export interface AuthSessionsContext {}

export interface AuthSessionsBody {}

export type AuthSessionsResponse = ResponseBody<{ sessions: Session[] }>;

export interface AuthSessionsAPI
  extends BaseAPI<
    AuthSessionsContext,
    AuthSessionsBody,
    AuthSessionsResponse
  > {}

const sessions: AuthSessionsAPI = () => {
  return axios.get<AuthSessionsResponse>('/api/auth/sessions');
};

export default sessions;
