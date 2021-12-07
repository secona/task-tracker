import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import faker from 'faker';

const TASKS_PER_PROJECT = 3;

export async function seed(knex: Knex): Promise<void> {
  await knex('tasks').del();

  const projects = await knex('projects').select('project_id');
  await knex('tasks').insert(
    new Array(projects.length * TASKS_PER_PROJECT).fill(null).map((_, i) => ({
      task_id: nanoid(11),
      project_id: projects[Math.floor(i / TASKS_PER_PROJECT)].project_id,
      task: faker.lorem.words(),
      description: faker.lorem.sentences(),
    }))
  );
}
