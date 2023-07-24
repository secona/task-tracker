import { db } from '~/clients';
import { User, UserInsert, UserUpdate } from './user.model';

export const userRepository = {
  async create(data: UserInsert): Promise<User> {
    const rows = await db('users').insert(data).returning('*');
    return rows[0];
  },

  async getOne(where: Partial<User>): Promise<User | undefined> {
    const user = await db('users').select('*').where(where).first();
    return user;
  },

  async update(
    where: Partial<User>,
    data: UserUpdate
  ): Promise<User | undefined> {
    const rows = await db('users').update(data, '*').where(where);
    return rows[0];
  },

  async del(where: Partial<User>): Promise<number> {
    return db('users').delete().where(where);
  },

  async getAllTasks(user_id: number, query: Record<string, any>) {
    return db('tasks')
      .select('tasks.*')
      .orderBy('created_at', 'asc')
      .leftJoin('projects', { 'projects.project_id': 'tasks.project_id' })
      .where({
        'projects.user_id': user_id,
        ...(query.projectId && { 'tasks.project_id': query.projectId }),
      });
  },
};

