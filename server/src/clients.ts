import Knex from 'knex';
import nodemailer from 'nodemailer';
import { createClient, RediSearchSchema, SchemaFieldTypes } from 'redis';

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
    await this.db.raw('SELECT 1').then(() => console.log('DB Connected'));
    // await this.email.verify().then(() => console.log('SMTP Verified'));
    await this.redis.connect().then(() => console.log('Redis Connected'));

    await this.redis.ft.create(
      // @ts-ignore
      'idx:session',
      {
        '$.user_id': {
          type: 'NUMERIC' as SchemaFieldTypes,
          AS: 'user_id',
        }
      },
      {
        ON: 'JSON',
        PREFIX: 'session:',
      }
    ).catch(() => {});
  },
};
