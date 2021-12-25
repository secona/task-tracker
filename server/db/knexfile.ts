require('dotenv').config({ path: '../.env' })
import { Knex } from 'knex';
import { join } from 'path';

export default {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: join(__dirname, 'seeds'),
      extension: 'ts',
    }
  } as Knex.Config,
};
