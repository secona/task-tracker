import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';
import { object, string } from 'yup';

export interface AuthSendVerifyContext {}

export interface AuthSendVerifyBody {
  email: string;
}

export type AuthSendVerifyResponse = ResponseBody;

export interface AuthSendVerifyAPI
  extends BaseAPI<
    AuthSendVerifyContext,
    AuthSendVerifyBody,
    AuthSendVerifyResponse
  > {}

const sendVerify: AuthSendVerifyAPI = ({ body }) => {
  return axios.post<AuthSendVerifyResponse>(`/api/auth/verify`, body);
};

sendVerify.validation = object().shape({
  email: string().email().required(),
});

export default sendVerify;
