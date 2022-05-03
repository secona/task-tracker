import jwt from 'jsonwebtoken';

export class TokenHandler<T extends object> {
  constructor(
    private o: {
      secretKey: string;
      signOptions?: jwt.SignOptions;
      verifyOptions?: jwt.VerifyOptions;
    }
  ) {}

  sign(payload: T) {
    return jwt.sign(payload, this.o.secretKey, this.o.signOptions);
  }

  verify(token: string) {
    return jwt.verify(token, this.o.secretKey, this.o.verifyOptions) as
      | (jwt.JwtPayload & T)
      | null;
  }
}

export interface VerificationToken {
  email: string;
}

export const verificationToken = new TokenHandler<VerificationToken>({
  secretKey: process.env.VERIFICATION_TOKEN_SECRET,
  signOptions: {
    expiresIn: '1h',
  },
});
