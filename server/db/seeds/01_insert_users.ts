import { Knex } from 'knex';
import { signAccessToken } from '../../src/lib/tokens';
import faker from 'faker';

const USER_COUNT = 3;

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const userIds = await knex('users').insert(
    new Array(USER_COUNT).fill(null).map(_ => ({
      name: faker.name.findName(),
      email: faker.internet.exampleEmail(),
      picture: faker.internet.avatar(),
    })),
    'user_id'
  );

  console.log(
    userIds.map(userId => ({
      user_id: userId,
      token: signAccessToken({ userId }),
    }))
  );
}
