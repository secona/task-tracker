import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import { Project } from '../../src/core/projects/project.model'
import { faker } from '@faker-js/faker';

const PROJECTS_PER_USER = 3;

export async function seed(knex: Knex): Promise<void> {
  await knex('projects').del();

  const users = await knex('users').select('user_id');
  await knex('projects').insert(
    new Array(users.length * PROJECTS_PER_USER).fill(null).map((_, i) => ({
      project_id: nanoid(11),
      user_id: users[Math.floor(i / PROJECTS_PER_USER)].user_id,
      name: faker.word.noun(),
      description: faker.lorem.sentence(4),
    } as Project))
  );
}
