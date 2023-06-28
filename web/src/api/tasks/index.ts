import getMany from './getMany';
import edit from './edit';

export * from './getMany';
export * from './edit';

export interface ITask {
  task_id: string;
  project_id: string;
  task: string;
  description: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ITaskEditable {
  task: string;
  description?: string;
  done?: boolean;
}

export const tasksAPI = {
  getMany,
  edit,
};
