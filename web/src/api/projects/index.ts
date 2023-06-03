import getMany from './getMany';
import newTask from './newTask';

export * from './getMany';
export * from './newTask';

export interface IProject {
  project_id: string;
  name: string;
  description: string;
  color: number;
  created_at: Date;
  updated_at: Date;
}

export const projectsAPI = {
  getMany,
  newTask,
};
