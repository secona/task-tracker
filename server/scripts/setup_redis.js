require('dotenv').config();
const { createClient } = require('redis');

(async () => {
  const redis = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
    socket: {
      connectTimeout: 50000,
    },
  });

  await redis.connect();
  console.log('Redis connected...');

  await redis.ft.create(
    'idx:session',
    {
      '$.user_id': {
        type: 'NUMERIC',
        AS: 'user_id',
      },
    },
    {
      ON: 'JSON',
      PREFIX: 'session:',
    }
  );
  console.log('Index created...');

  await redis.quit();
  console.log('Redis disconnected...');
})();
