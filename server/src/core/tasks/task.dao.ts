import { nanoid } from 'nanoid';
import { db } from '~/clients';
import { BasicDAO } from '~/interfaces/DAO';
import { Task, TaskInsert, TaskUpdate } from './task.model';

class TaskDAO implements BasicDAO<Task, TaskInsert, TaskUpdate> {
  returnFields: (keyof Task)[] = Object.keys(new Task()) as (keyof Task)[];

  async create(data: TaskInsert): Promise<Task> {
    const rows = await db('tasks')
      .insert({ ...data, task_id: nanoid(11) })
      .returning(this.returnFields);
    return rows[0] as Task;
  }

  async getOne(where: Partial<Task>): Promise<Task | undefined> {
    const task = await db('tasks')
      .select(this.returnFields)
      .where(where)
      .first();
    return task;
  }

  async getMany(where: Partial<Task>): Promise<Task[] | undefined> {
    const task = await db('tasks').select(this.returnFields).where(where);
    return task;
  }

  async update(
    where: Partial<Task>,
    data: TaskUpdate
  ): Promise<Task | undefined> {
    const rows = await db('tasks').update(data, this.returnFields).where(where);
    return rows[0];
  }

  async del(where: Partial<Task>): Promise<number> {
    return db('tasks').delete().where(where);
  }
}

export const taskDAO = new TaskDAO();
