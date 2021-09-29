import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', t => {
    t.increments('user_id').primary();
    t.text('email').notNullable().unique();
    t.text('name').notNullable();
    t.text('picture').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
