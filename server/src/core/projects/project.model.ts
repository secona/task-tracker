import { z } from 'zod';

export class Project {
  project_id!: string;
  user_id!: number;
  name!: string;
  description!: string;
  color!: number;
  created_at!: Date;
  updated_at!: Date;
}

export class ProjectInsert {
  user_id: number;
  name: string;
  description: string;
  color: number;

  constructor(data: ProjectInsert) {
    this.user_id = data.user_id;
    this.name = data.name;
    this.description = data.description;
    this.color = data.color;
  }
}

export class ProjectUpdate {
  name: string;
  description: string;
  color: number;

  constructor(data: ProjectUpdate) {
    this.name = data.name;
    this.description = data.description;
    this.color = data.color;
  }
}

export const projectValidation = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  color: z.number().optional(),
});
