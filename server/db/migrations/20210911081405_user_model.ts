import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', t => {
    t.uuid('user_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    t.text('email').notNullable().unique();
    t.text('name').notNullable();
    t.text('picture').notNullable();
    t.timestamps(true, true)
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
