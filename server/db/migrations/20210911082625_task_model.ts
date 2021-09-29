import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tasks', t => {
      t.text('task_id').primary();
      t.integer('owner_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE');
      t.text('task').notNullable();
      t.boolean('done').notNullable().defaultTo(false);
      t.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}
