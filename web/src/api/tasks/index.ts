import getMany from './getMany';

export interface ITask {
  task_id: string;
  project_id: string;
  task: string;
  description: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

export default {
  getMany,
};
