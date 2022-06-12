import { nanoid } from 'nanoid';
import { db } from '~/clients';
import { Task, TaskInsert, TaskUpdate } from './task.model';

export const taskRepository = {
  async create(user_id: number, data: TaskInsert): Promise<Task> {
    const ent = Object.entries({ ...data, task_id: nanoid(11) });
    const columns = `(${ent.map(v => v[0])})`;
    const values = ent.map(v => `'${v[1]}'`);

    const selectQuery = db('projects')
      .select(db.raw(values))
      .where('projects.project_id', data.project_id)
      .andWhere('projects.user_id', user_id)
      .toSQL();

    const { rows } = await db.raw(
      `INSERT INTO tasks ${columns} ${selectQuery.sql} RETURNING *`,
      selectQuery.bindings
    );

    return rows[0];
  },

  async getOne(user_id: number, task_id: string): Promise<Task | undefined> {
    const task = await db('tasks')
      .select('tasks.*')
      .leftJoin('projects', { 'projects.project_id': 'tasks.project_id' })
      .where('tasks.task_id', task_id)
      .andWhere('projects.user_id', user_id)
      .first();
    return task;
  },

  async update(
    user_id: number,
    task_id: string,
    data: TaskUpdate
  ): Promise<Task | undefined> {
    const rows = await db('tasks')
      .update(data)
      .whereExists(
        db.select(1)
          .from('projects')
          .where('projects.project_id', db.raw('tasks.project_id'))
          .andWhere('projects.user_id', user_id)
      )
      .andWhere('tasks.task_id', task_id)
      .returning('*');
    return rows[0];
  },

  async del(user_id: number, task_id: string): Promise<number> {
    return db('tasks')
      .delete()
      .whereExists(
        db.select(1)
          .from('projects')
          .where('projects.project_id', db.raw('tasks.project_id'))
          .andWhere('projects.user_id', user_id)
      )
      .andWhere('tasks.task_id', task_id);
  },
}
