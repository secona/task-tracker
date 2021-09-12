import db from '~/db';
import { User, UserInsert, UserJoined } from './users.schemas';

export const UserDAO = {
  /** @returns every field of new or updated user */
  async upsert(data: UserInsert): Promise<User> {
    const user = await db('users')
      .insert(data)
      .returning('*')
      .onConflict('email')
      .merge();
    return user[0];
  },

  /** @returns users with tasks joined */
  async findByIdJoin(user_id: string): Promise<UserJoined | undefined> {
    return db
      .select([
        'users.*',
        db.raw(
          `CASE WHEN COUNT(tasks.*) = 0 THEN '[]' ELSE JSON_AGG(tasks.*) END AS tasks`
        ),
      ])
      .from('users')
      .where({ user_id })
      .leftJoin('tasks', { 'users.user_id': 'tasks.author_id' })
      .groupBy('users.user_id')
      .first();
  },

  /** @returns deleted count */
  async deleteById(user_id: string): Promise<number> {
    return db.delete().from('users').where({ user_id });
  },
};
