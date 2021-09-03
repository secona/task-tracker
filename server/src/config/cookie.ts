import { CookieOptions } from 'express';

export const baseConfig: CookieOptions = {
  secure: process.env.NODE_ENV === 'production' ? true : false,
};

export const accessTokenConfig: CookieOptions = {
  ...baseConfig,
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 2_592_000_000, // 30 days
};

export default {
  baseConfig,
  accessTokenConfig,
}