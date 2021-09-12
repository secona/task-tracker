import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('tasks').del();

  const users: Array<{ user_id: string }> = await knex('users').select('user_id');
  const tasks: any[] = [];

  users.forEach(({ user_id: author_id }) => {
    tasks.push(
      { task: 'test api', author_id },
      { task: 'attend meeting', author_id },
      { task: 'school', author_id }
    );
  });

  await knex('tasks').insert(tasks);
}
