import db from '~/db';
import { BasicDAO } from '~/interfaces/DAO';
import { User, UserInsert } from './user.model';

class UserDAO extends BasicDAO<User, UserInsert> {
  returnFields: '*' | (keyof User)[] = [
    'email',
    'name',
    'picture',
    'created_at',
    'updated_at',
  ];
  
  async create(data: UserInsert): Promise<User> {
    const rows = await db('users')
      .insert(data)
      .returning(this.returnFields)
      .onConflict('email')
      .merge();
    return rows[0];
  }

  async get(user_id: number): Promise<User | undefined> {
    const user = await db('users')
      .select(this.returnFields)
      .where({ user_id })
      .first();
    return user;
  }

  async update(user_id: number, data: UserInsert): Promise<User | undefined> {
    const rows = await db('users')
      .update(data, this.returnFields)
      .where({ user_id });
    return rows[0];
  }

  async del(user_id: number): Promise<number> {
    return db('users').delete().where({ user_id });
  }
}

export const userDAO = new UserDAO();
