import axios, { AxiosResponse } from 'axios';
import { SchemaOf } from 'yup';

export type ResponseBody<Data extends {} = {}> =
  | {
      msg: 'VALIDATION_FAILED';
      details: Record<string, string[]>;
    }
  | { msg: 'NOT_LOGGED_IN' }
  | { msg: 'ALREADY_LOGGED_IN' }
  | { msg: 'UNVERIFIED_EMAIL' }
  | { msg: 'TOKEN_EXPIRED' }
  | { msg: 'TOKEN_MALFORMED' }
  | { msg: 'UNKNOWN' }
  | ({ msg: 'SUCCESS' } & Data)
  | ({ msg: 'NOT_FOUND' } & Record<keyof Data, {}>);

export type NEW_ResponseBody<Data extends {} = {}> = { msg: 'SUCCESS' } & Data;

export type NEW_ErrorResponseBody<Data extends {} = {}> =
  | {
      msg: 'VALIDATION_FAILED';
      details: Record<string, string[]>;
    }
  | { msg: 'NOT_LOGGED_IN' }
  | { msg: 'ALREADY_LOGGED_IN' }
  | { msg: 'UNVERIFIED_EMAIL' }
  | { msg: 'TOKEN_EXPIRED' }
  | { msg: 'TOKEN_MALFORMED' }
  | { msg: 'UNKNOWN' }
  | ({ msg: 'NOT_FOUND' } & Record<keyof Data, {}>);

// prettier-ignore
export type BaseAPI<
  Context extends object,
  Body extends object,
  Response extends ResponseBody,
  Args = (keyof Context extends never ? {} : { context: Context }) &
    (keyof Body extends never ? {} : { body: Body })
> = (keyof Args extends never
  ? { (): Promise<AxiosResponse<Response, any>> }
  : { (data: Args): Promise<AxiosResponse<Response, any>> }) 
  & (keyof Body extends never
  ? {}
  : { validation: SchemaOf<Body> });

export const NEW_axios = axios.create({
  validateStatus: s => s < 400,
});
