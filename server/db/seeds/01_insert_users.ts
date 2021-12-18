import { Knex } from 'knex';
import { accessToken } from '../../src/lib/tokens';
import { User } from '../../src/core/users/user.model';
import faker from 'faker';

const USER_COUNT = 3;

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const userIds = await knex('users').insert(
    new Array(USER_COUNT).fill(null).map(() => {
      const u = new User();
      u.name = faker.name.findName();
      u.email = faker.internet.exampleEmail();
      u.picture = faker.internet.avatar();
      return u;
    }),
    'user_id'
  );

  console.log(
    userIds.map(user_id => ({
      user_id,
      token: accessToken.sign({ user_id }),
    }))
  );
}
