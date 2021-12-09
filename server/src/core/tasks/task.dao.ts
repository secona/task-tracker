import { nanoid } from 'nanoid';
import db from '~/db';
import { BasicDAO } from '~/interfaces/DAO';
import { Task, TaskInsert, TaskUpdate } from './task.model';

class TaskDAO extends BasicDAO<Task, TaskInsert, TaskUpdate> {
  returnFields: '*' | (keyof Task)[] = '*';

  async create(data: TaskInsert): Promise<Task> {
    const rows = await db('tasks')
      .insert({ ...data, task_id: nanoid(11) })
      .returning(this.returnFields);
    return rows[0] as Task;
  }

  async get(task_id: string): Promise<Task | undefined> {
    const task = await db('tasks')
      .select(this.returnFields)
      .where({ task_id })
      .first();
    return task;
  }

  async update(task_id: string, data: TaskUpdate): Promise<Task | undefined> {
    const rows = await db('tasks')
      .update(data, this.returnFields)
      .where({ task_id })
    return rows[0];
  }

  async del(task_id: string): Promise<number> {
    return db('tasks').delete().where({ task_id });
  }
}

export const taskDAO = new TaskDAO();
