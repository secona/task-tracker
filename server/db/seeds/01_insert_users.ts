import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { User } from '../../src/core/users/user.model';
import faker from '@faker-js/faker';

const USER_COUNT = 3;

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const users = await knex('users').insert(
    new Array(USER_COUNT).fill(null).map(() => {
      const name = faker.fake('{{name.firstName}} {{name.lastName}}');
      return {
        name,
        password: bcrypt.hashSync('12345678', 10),
        email: `${name.replace(' ', '.').toLowerCase()}@example.com`,
        verified: true,
      } as User
    }),
    '*'
  );

  users.forEach(({ user_id, email }) => {
    console.log(user_id, email);
  })
}
