import nodemailer from 'nodemailer';
import { getTemplates, SendTemplateOptions } from './templates';
import clients from '~/clients';

const templates = getTemplates();

const emailService = {
  send(options: nodemailer.SendMailOptions) {
    clients.email.sendMail({
      ...options,
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_ADDRESS}>`,
    });
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

