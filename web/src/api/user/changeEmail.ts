import axios from 'axios';
import { object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';

export interface UserChangeEmailContext {}

export interface UserChangeEmailBody {
  email: string;
}

export type UserChangeEmailResponse = ResponseBody;

export interface UserChangeEmailAPI
  extends BaseAPI<
    UserChangeEmailContext,
    UserChangeEmailBody,
    UserChangeEmailResponse
  > {}

const changeEmail: UserChangeEmailAPI = ({ body }) => {
  return axios.put<UserChangeEmailResponse>('/api/user/email', body);
};

changeEmail.validation = object().shape({
  email: string().email().required(),
});

export default changeEmail;
