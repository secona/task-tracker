import { db } from '~/clients';
import { User, UserInsert, UserUpdate } from './user.model';

interface GetOptions {
  complete?: boolean;
}

class UserRepository {
  returnFields: (keyof User)[] = ['email', 'name', 'created_at', 'updated_at'];

  async create(data: UserInsert): Promise<User> {
    const rows = await db('users')
      .insert(data)
      .returning('*')
      .onConflict('email')
      .merge();
    return rows[0];
  }

  async getOne(where: Partial<User>, opt?: GetOptions): Promise<User | undefined> {
    const user = await db('users')
      .select(opt?.complete ? '*' : this.returnFields)
      .where(where)
      .first();
    return user;
  }

  async update(
    where: Partial<User>,
    data: UserUpdate
  ): Promise<User | undefined> {
    const rows = await db('users').update(data, '*').where(where);
    return rows[0];
  }

  async del(where: Partial<User>): Promise<number> {
    return db('users').delete().where(where);
  }

  async getAllTasks(user_id: string) {
    return db('tasks')
      .select('tasks.*')
      .leftJoin('projects', { 'projects.project_id': 'tasks.project_id' })
      .where({ 'projects.user_id': user_id })
  }
}

export const userRepository = new UserRepository();
