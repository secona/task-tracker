import getMany from './getMany';
import newTask from './newTask';
import newProject from './newProject';
import edit from './edit';
import del from './del';

export * from './getMany';
export * from './newTask';
export * from './newProject';
export * from './edit';
export * from './del';

export interface IProject {
  project_id: string;
  name: string;
  description: string;
  color: number;
  created_at: Date;
  updated_at: Date;
}

export interface IProjectEditable {
  name?: string;
  description?: string;
  color?: number;
}

export const projectsAPI = {
  getMany,
  newTask,
  newProject,
  edit,
  del,
};
