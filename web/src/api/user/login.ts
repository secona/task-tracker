import axios from 'axios';
import { object, SchemaOf, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';

export interface LoginData {
  email: string;
  password: string;
}

export type LoginResponse = ResponseBody;

export interface LoginAPI extends BaseAPI<LoginData, LoginResponse> {
  validation: SchemaOf<LoginData>;
}

const login: LoginAPI = async (data: LoginData) => {
  return axios.post<LoginResponse>('/api/auth/login', data);
};

login.validation = object().shape({
  email: string().required(),
  password: string().required(),
});

export default login;
