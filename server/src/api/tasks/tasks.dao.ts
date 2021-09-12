import db from '~/db';
import { Task, TaskInsert, TaskUpdate } from './tasks.schemas';

export const TaskDAO = {
  /** @returns new task */
  async create(data: TaskInsert): Promise<Task> {
    return db('tasks')
      .insert(data)
      .returning('*')
      .then(data => data[0]);
  },

  /** @returns task or undefined if not found */
  findById(task_id: string): Promise<Task | undefined> {
    return db('tasks').select('*').where({ task_id }).first();
  },

  /** @returns updated task */
  async updateById(task_id: string, data: TaskUpdate): Promise<Task> {
    return db('tasks')
      .update(data)
      .where({ task_id })
      .returning('*')
      .then(data => data[0]);
  },

  /** @returns deleted count */
  deleteById(task_id: string): Promise<number> {
    return db('tasks').delete().where({ task_id });
  },
};
