import * as z from 'zod';

export interface Task {
  task_id: string;
  owner_id: number;
  task: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

export type TaskInsert = Pick<Task, 'owner_id' | 'task'> &
  Partial<Pick<Task, 'done' | 'task_id'>>;

export type TaskUpdate = Pick<Task, 'task' | 'done'>;

export const TaskValidationSchema = z.object({
  task: z.string().nonempty(),
  done: z.boolean().optional(),
});
