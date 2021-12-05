require('dotenv').config();
import { Knex } from 'knex';
import { signAccessToken } from '../../src/lib/tokens';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const userIds = await knex('users')
    .insert([
      { name: 'Bob', email: 'bob@example.io', picture: '' },
      { name: 'Jan', email: 'jandeman@db.io', picture: '' },
      { name: 'Ali', email: 'ali12@email.sh', picture: '' },
    ])
    .returning('user_id');

  console.log(
    userIds.map(userId => ({ userId, token: signAccessToken({ userId }) })),
  );
}
