import Knex from 'knex';
import nodemailer from 'nodemailer';
import { createClient } from 'redis';
import { logger } from './utils/logger';

export const db = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

export const redis = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  socket: {
    connectTimeout: 50000,
  },
});

export const email = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default {
  db,
  redis,
  email,

  async connect() {
    await this.db.raw('SELECT 1').then(() => logger.info('DB Connected'));
    await this.email.verify().then(() => logger.info('SMTP Verified'));
    await this.redis.connect().then(() => logger.info('Redis Connected'));
  },
};
