import jwt from 'jsonwebtoken';

export interface AccessToken {
  userId: number;
}

export function signAccessToken(payload: AccessToken) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '30d',
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as
    | (jwt.JwtPayload & AccessToken)
    | null;
}
