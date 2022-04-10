require('dotenv').config();
import db from './lib/db';
import redis from './lib/redis';
import { transporter } from './lib/email';
import { createServer } from './server';

async function main() {
  await db.raw('SELECT 1').then(() => console.log('DB Connected'));
  await transporter.verify().then(() => console.log('SMTP Verified'));
  await redis.connect().then(() => console.log('Redis Connected'));

  const app = createServer();

  app.listen(5000, () => {
    console.log('Listening on port 5000 for', process.env.NODE_ENV);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
