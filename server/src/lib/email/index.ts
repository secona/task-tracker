import nodemailer from 'nodemailer';

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
};

export default email;
