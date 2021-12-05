import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', t => {
    t.increments('user_id').primary();
    t.text('email').notNullable().unique();
    t.text('name').notNullable();
    t.text('picture').notNullable();
    t.timestamps(true, true);
  })
  
  await knex.schema.createTable('tasks', t => {
    t.text('task_id').primary();
    t.integer('owner_id').notNullable().references('user_id').inTable('users').onDelete('CASCADE');
    t.text('task').notNullable();
    t.boolean('done').notNullable().defaultTo(false);
    t.timestamps(true, true);
  })

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

    CREATE TRIGGER update_timestamp BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('tasks');
  await knex.raw(`DROP FUNCTION IF EXISTS update_timestamp() CASCADE;`);
}
