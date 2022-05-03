import { CookieOptions } from 'express';

type CookieCtx = [string, any, CookieOptions];

const cookieConfig = (config: CookieOptions) => ({
  secure: process.env.NODE_ENV === 'production' ? true : false,
  ...config,
});

export const cookieKeys = {
  SESSION_ID: 'session_id',
};

const cookieService = {
  sessionId: (sessionId: string) =>
    [
      cookieKeys.SESSION_ID,
      sessionId,
      cookieConfig({
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 2_592_000_000, // 30 days
      }),
    ] as CookieCtx,
};

export default cookieService;
