import axios from 'axios';
import { object, SchemaOf, string } from 'yup';

export interface ILogin {
  email: string;
  password: string;
}

const validation: SchemaOf<ILogin> = object().shape({
  email: string().required(),
  password: string().required(),
});

const login = async (data: ILogin) => {
  return axios.post('/api/auth/login', data);
};

export default {
  validation,
  login,
};
