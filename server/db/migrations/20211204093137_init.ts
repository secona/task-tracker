import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users').createTable('users', t => {
    t.increments('user_id').primary();
    t.text('email').notNullable().unique();
    t.text('password').notNullable();
    t.text('name').notNullable();
    t.boolean('verified').notNullable().defaultTo(false);
    t.timestamps(true, true);
  });

  await knex.schema.dropTableIfExists('projects').createTable('projects', t => {
    t.text('project_id').primary();
    t.integer('user_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE');
    t.text('name').notNullable();
    t.text('description').notNullable().defaultTo('');
    t.integer('color').notNullable().defaultTo(0);
    t.timestamps(true, true);
  });

  await knex.schema.dropTableIfExists('tasks').createTable('tasks', t => {
    t.text('task_id').primary();
    t.text('project_id').notNullable().references('project_id').inTable('projects').onDelete('CASCADE');
    t.text('task').notNullable().defaultTo('');
    t.text('description').notNullable().defaultTo('');
    t.boolean('done').notNullable().defaultTo(false);
    t.timestamps(true, true);
  });

  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
    $$;

    CREATE TRIGGER update_timestamp BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

    CREATE TRIGGER update_timestamp BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

    CREATE TRIGGER update_timestamp BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks');
  await knex.schema.dropTable('projects')
  await knex.schema.dropTable('users');
  await knex.raw(`DROP FUNCTION IF EXISTS update_timestamp() CASCADE;`);
}
