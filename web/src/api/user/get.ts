import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';
import { IUser } from '.';

export interface UserGetContext {}

export interface UserGetBody {}

export type UserGetResponse = ResponseBody<{ user: IUser }>;

export interface UserGetAPI
  extends BaseAPI<UserGetContext, UserGetBody, UserGetResponse> {}

const get: UserGetAPI = () => {
  return axios.get<UserGetResponse>('/api/user');
};

export default get;
