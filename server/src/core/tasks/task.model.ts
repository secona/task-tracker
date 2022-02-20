import { z } from 'zod';

export class Task {
  task_id!: string;
  project_id!: string;
  task!: string;
  description!: string;
  done!: boolean;
  created_at!: Date;
  updated_at!: Date;
}

export class TaskInsert {
  project_id: string;
  task: string;
  description: string;
  done: boolean;

  constructor(data: TaskInsert) {
    this.project_id = data.project_id
    this.task = data.task
    this.description = data.description
    this.done = data.done
  }
}

export class TaskUpdate {
  task: string;
  description: string;
  done: boolean;
  
  constructor(data: TaskUpdate) {
    this.task = data.task;
    this.description = data.description;
    this.done = data.done;
  }
}

export const taskValidation = z.object({
  task: z.string().nonempty(),
  description: z.string().optional(),
  done: z.boolean().optional(),
});