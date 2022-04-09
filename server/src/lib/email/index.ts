import nodemailer from 'nodemailer';
import { getTemplates, SendTemplateOptions } from './templates';

const templates = getTemplates();

export const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const email = {
  send(options: nodemailer.SendMailOptions) {
    transporter.sendMail({
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

export default email;
