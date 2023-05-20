import { User } from '~/core/users/user.model';
import emailService from './emailService';
import tokenService from './tokenService';

const emailVerificationService = {
  async sendEmail(user: User) {
    const token = tokenService.verification.sign({ email: user.email });
    const url = `${process.env.FRONTEND_ROOT_URL}/verify?token=${token}`;

    emailService.sendTemplate({
      to: user.email,
      templateName: 'email-verification',
      props: { url, name: user.name },
    });
  },
};

export default emailVerificationService;
