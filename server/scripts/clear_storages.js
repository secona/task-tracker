require('dotenv').config();
const Knex = require('knex');
const { createClient } = require('redis');

async function clearSessionStorage() {
  const redis = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  });

  await redis.connect();
  await redis.flushDb();

  const keys = await redis.keys('*');
  console.log('Redis keys:', keys);
  await redis.quit();
}

async function clearDatabase() {
  const knex = Knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
  });

  await knex.del().from('users');

  const count = (await knex('users').count())[0].count;
  console.log('DB row count:', count);
  await knex.destroy();
}

(async () => {
  await clearSessionStorage();
  await clearDatabase();
})();
