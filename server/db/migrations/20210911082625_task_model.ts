import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tasks', t => {
      t.uuid('task_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      t.uuid('author_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE');
      t.text('task').notNullable();
      t.boolean('done').defaultTo(false);
      t.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}
