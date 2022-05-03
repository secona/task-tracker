import { db } from '~/clients';
import { BasicDAO } from '~/interfaces/DAO';
import { User, UserInsert } from './user.model';

class UserDAO implements BasicDAO<User, UserInsert> {
  returnFields: (keyof User)[] = ['email', 'name', 'created_at', 'updated_at'];

  async create(data: UserInsert): Promise<User> {
    const rows = await db('users')
      .insert(data)
      .returning(this.returnFields)
      .onConflict('email')
      .merge();
    return rows[0];
  }

  async getOne(where: Partial<User>): Promise<User | undefined> {
    const user = await db('users')
      .select(this.returnFields)
      .where(where)
      .first();
    return user;
  }

  async getMany(where: Partial<User>): Promise<User[] | undefined> {
    const user = await db('users').select(this.returnFields).where(where);
    return user;
  }

  async update(
    where: Partial<User>,
    data: UserInsert
  ): Promise<User | undefined> {
    const rows = await db('users').update(data, this.returnFields).where(where);
    return rows[0];
  }

  async del(where: Partial<User>): Promise<number> {
    return db('users').delete().where(where);
  }
}

export const userDAO = new UserDAO();
