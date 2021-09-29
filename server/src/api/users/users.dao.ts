import db from '~/db';
import { taskReturnFields } from '../tasks/tasks.dao';
import { User, UserInsert, UserJoined } from './users.common';

export const userReturnFields: Array<keyof User> = [
  'email',
  'name',
  'picture',
  'created_at',
  'updated_at',
];

export const UserDAO = {
  /** @returns `user_id` of new or updated user */
  async upsert(data: UserInsert): Promise<Pick<User, 'user_id'>> {
    const user = await db('users')
      .insert(data)
      .returning('user_id')
      .onConflict('email')
      .merge();
    return user[0];
  },

  /** @returns users with tasks joined */
  async findByIdJoin(user_id: number): Promise<UserJoined | null> {
    const user = await db
      .select([
        ...userReturnFields.map(f => `users.${f}`),
        db.raw(`
          CASE WHEN COUNT("tasks"."task_id") = 0
            THEN '[]'
            ELSE JSON_AGG(
              JSON_BUILD_OBJECT(
                ${taskReturnFields.map(f => `'${f}', "tasks"."${f}"`)}
              )
            )
          END AS "tasks"
        `),
      ])
      .from('users')
      .where({ user_id })
      .join('tasks', { 'users.user_id': 'tasks.owner_id' })
      .groupBy('users.user_id')
      .first();

    return user ?? null;
  },

  /** @returns deleted count */
  async deleteById(user_id: number): Promise<number> {
    return db.delete().from('users').where({ user_id });
  },
};
