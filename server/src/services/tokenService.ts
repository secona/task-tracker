import jwt from 'jsonwebtoken';

export class TokenFns<T extends object> {
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

export interface ForgotPasswordToken {
  email: string;
  current_password: string;
}

const tokenService = {
  verification: new TokenFns<VerificationToken>({
    secretKey: process.env.VERIFICATION_TOKEN_SECRET,
    signOptions: {
      expiresIn: '1h',
    },
  }),

  forgotPassword: new TokenFns<ForgotPasswordToken>({
    secretKey: process.env.FORGOT_PASSWORD_TOKEN_SECRET,
    signOptions: {
      expiresIn: '15m'
    }
  }),
};

export default tokenService;

