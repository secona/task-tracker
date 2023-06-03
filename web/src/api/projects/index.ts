import getMany from './getMany';

export * from './getMany';

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
};
