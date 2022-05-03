require('dotenv').config();
import { createServer } from './server';
import clients from './clients';

async function main() {
  clients.connect();

  const app = createServer();

  app.listen(5000, () => {
    console.log('Listening on port 5000 for', process.env.NODE_ENV);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
