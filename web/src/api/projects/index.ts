import getMany from './getMany';

export interface Project {
  project_id: string;
  name: string;
  description: string;
  color: number;
  created_at: Date;
  updated_at: Date;
}

export default {
  getMany,
};
