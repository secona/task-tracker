require('dotenv').config();
import { Knex }  from 'knex';
import { join } from 'path';

export default {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, 'db/migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: join(__dirname, 'db/seeds'),
      extension: 'ts',
      timestampFilenamePrefix: true,
    }
  } as Knex.Config,
};
