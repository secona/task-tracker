import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import { Project } from '../../src/core/projects/project.model'
import faker from '@faker-js/faker';

const PROJECTS_PER_USER = 3;

export async function seed(knex: Knex): Promise<void> {
  await knex('projects').del();

  const users = await knex('users').select('user_id');
  await knex('projects').insert(
    new Array(users.length * PROJECTS_PER_USER).fill(null).map((_, i) => {
      const p = new Project();
      p.project_id = nanoid(11);
      p.user_id = users[Math.floor(i / PROJECTS_PER_USER)].user_id;
      p.name = faker.word.noun();
      p.description = faker.lorem.sentence(4);
      return p;
    })
  );
}
