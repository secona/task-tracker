import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
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
  return knex.raw(`
    DROP FUNCTION IF EXISTS update_timestamp();
    DROP TRIGGER IF EXISTS update_timestamp ON users;
    DROP TRIGGER IF EXISTS update_timestamp ON tasks;
  `)
}
