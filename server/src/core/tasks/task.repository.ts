import { nanoid } from 'nanoid';
import { db } from '~/clients';
import { Task, TaskInsert, TaskUpdate } from './task.model';

class TaskRepository {
  async create(data: TaskInsert): Promise<Task> {
    const rows = await db('tasks')
      .insert({ ...data, task_id: nanoid(11) })
      .returning('*');
    return rows[0];
  }

  async getOne(where: Partial<Task>): Promise<Task | undefined> {
    const task = await db('tasks')
      .select('*')
      .where(where)
      .first();
    return task;
  }

  async getMany(where: Partial<Task>): Promise<Task[] | undefined> {
    const task = await db('tasks').select('*').where(where);
    return task;
  }

  async update(
    where: Partial<Task>,
    data: TaskUpdate
  ): Promise<Task | undefined> {
    const rows = await db('tasks').update(data, '*').where(where);
    return rows[0];
  }

  async del(where: Partial<Task>): Promise<number> {
    return db('tasks').delete().where(where);
  }
}

export const taskRepository = new TaskRepository();
