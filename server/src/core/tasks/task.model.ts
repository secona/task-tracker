import { z } from 'zod';

export interface Task {
  task_id: string;
  project_id: string;
  task: string;
  description: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TaskInsert {
  project_id: string;
  task: string;
  description: string;
  done: boolean;
}

export interface TaskUpdate {
  task?: string;
  description?: string;
  done?: boolean;
}

export class TaskResponse {
  task_id: string;
  project_id: string;
  task: string;
  description: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(task: Task) {
    this.task_id = task.task_id;
    this.project_id = task.project_id;
    this.task = task.task;
    this.description = task.description;
    this.done = task.done;
    this.created_at = task.created_at;
    this.updated_at = task.updated_at;
  }

  static array(tasks: Task[] | undefined) {
    if (tasks) return tasks.map(task => new TaskResponse(task));
  }
}

export const taskSchemas = new (class {
  create = z.object({
    task: z.string().min(1),
    description: z.string().optional(),
    done: z.boolean().optional(),
  });

  update = this.create.partial();
})();
