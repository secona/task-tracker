import db from '~/db';

export interface User {
  user_id: string;
  email: string;
  name: string;
  picture: string;
  created_at: Date;
  updated_at: Date;
}

export type UserInsert = Pick<User, 'email' | 'name' | 'picture'>;

export const UserDAL = {
  create(data: UserInsert) {
    return db('users').insert(data).returning('*');
  },

  async findByIdJoin(user_id: string) {
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

  deleteById(user_id: string) {
    return db.delete().from('users').where({ user_id });
  },
};
