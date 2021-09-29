import { nanoid } from 'nanoid';
import db from '~/db';
import { Task, TaskInsert, TaskUpdate } from './tasks.common';

export const taskIdLength = 11;

export const taskReturnFields: Array<keyof Task> = [
  'task_id',
  'task',
  'done',
  'created_at',
  'updated_at',
];

export const TaskDAO = {
  /** @returns new task */
  async create(data: Omit<TaskInsert, 'task_id'>): Promise<Task> {
    const task = await db('tasks')
      .insert({ ...data, task_id: nanoid(taskIdLength) })
      .returning(taskReturnFields);
    return task[0];
  },

  /** @returns task or `null` if not found */
  async findById(owner_id: number, task_id: string): Promise<Task | null> {
    const task = await db('tasks')
      .select(taskReturnFields)
      .where({ owner_id, task_id })
      .first();
    return task ?? null;
  },

  /** @returns updated task or `null` if not found */
  async updateById(
    owner_id: number,
    task_id: string,
    data: TaskUpdate
  ): Promise<Task | null> {
    const task = await db('tasks')
      .update(data)
      .where({ owner_id, task_id })
      .returning(taskReturnFields);
    return task[0] ?? null;
  },

  /** @returns deleted count */
  deleteById(owner_id: number, task_id: string): Promise<number> {
    return db('tasks').delete().where({ task_id, owner_id });
  },
};
