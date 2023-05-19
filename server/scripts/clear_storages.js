require('dotenv').config();
const Knex = require('knex');
const { createClient } = require('redis');

async function clearSessionStorage() {
  const redis = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
    socket: {
      connectTimeout: 50000,
    },
  });

  await redis.connect();
  console.log('Redis connected...');

  await redis.flushDb();
  console.log('Redis keys flushed...');

  const keys = await redis.keys('*');
  console.log('Redis key count:', keys.length);

  await redis.quit();
  console.log('Redis disconnected...');
}

async function clearDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
  });
  console.log('Postgres connected...');

  await knex.del().from('users');
  console.log('Postgres rows deleted...');

  const count = (await knex('users').count())[0].count;
  console.log('Postgres row count:', count);

  await knex.destroy();
  console.log('Posgres disconnected...');
}

(async () => {
  await clearSessionStorage();
  await clearDatabase();
})();
