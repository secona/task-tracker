import { z } from 'zod';

export interface Project {
  project_id: string;
  user_id: number;
  name: string;
  description: string;
  color: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectInsert {
  user_id: number;
  name: string;
  description: string;
  color: number;
}

export interface ProjectUpdate {
  name: string;
  description: string;
  color: number;
}

export class ProjectResponse {
  project_id: string;
  name: string;
  description: string;
  color: number;
  created_at: Date;
  updated_at: Date;

  constructor(project: Project) {
    this.project_id = project.project_id;
    this.name = project.name;
    this.description = project.description;
    this.color = project.color;
    this.created_at = project.created_at;
    this.updated_at = project.updated_at;
  }
}

export const projectSchemas = new class {
  create = z.object({
    name: z.string().nonempty(),
    description: z.string().optional(),
    color: z.number().optional(),
  });

  update = this.create.partial();
}