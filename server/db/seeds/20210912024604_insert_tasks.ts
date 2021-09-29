import { Knex } from 'knex';
import { nanoid } from 'nanoid';
import { taskIdLength } from '../../src/api/tasks/tasks.dao';

export async function seed(knex: Knex): Promise<void> {
  await knex('tasks').del();

  const users: Array<{ user_id: string }> = await knex('users').select('user_id');
  const tasks: any[] = [];

  users.forEach(({ user_id: owner_id }) => {
    tasks.push(
      { task_id: nanoid(11), task: 'test api', owner_id },
      { task_id: nanoid(11), task: 'attend meeting', owner_id },
      { task_id: nanoid(11), task: 'school', owner_id }
    );
  });

  await knex('tasks').insert(tasks);
}
