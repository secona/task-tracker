import nodemailer from 'nodemailer';
import { getTemplates, SendTemplateOptions } from './templates';
import clients from '~/clients';
import { logger } from '~/utils/logger';

const templates = getTemplates();

const emailService = {
  send(options: nodemailer.SendMailOptions) {
    clients.email
      .sendMail({
        ...options,
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_ADDRESS}>`,
      })
      .then(v =>
        logger.info(
          `Sent email to ${v.envelope.to} with subject "${options.subject}"`,
          { category: 'Email' }
        )
      );
  },

  sendTemplate({ templateName, props, ...options }: SendTemplateOptions) {
    const extract = templates[templateName];
    const html = extract.passProps(props);
    this.send({
      ...options,
      subject: extract.data.subject,
      html,
    });
  },
};

export default emailService;
