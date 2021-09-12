import db from '~/db';

export interface Task {
  task_id: string;
  author_id: string;
  task: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

export type TaskInsert = Pick<Task, 'author_id' | 'task'> & Partial<Pick<Task, 'done'>>;

export type TaskUpdate = Pick<Task, 'task' | 'done'>;

export const TaskDAL = {
  create(data: TaskInsert) {
    return db('tasks').insert(data).returning('*');
  },

  findById(task_id: string) {
    return db('tasks').select('*').where({ task_id }).first();
  },

  updateById(task_id: string, data: TaskUpdate) {
    return db('tasks').update(data).where({ task_id }).returning('*');
  },

  deleteById(task_id: string) {
    return db('tasks').delete().where({ task_id })
  }
}