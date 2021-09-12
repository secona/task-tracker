import * as z from 'zod';

export interface Task {
  task_id: string;
  author_id: string;
  task: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

export type TaskInsert = Pick<Task, 'author_id' | 'task'> &
  Partial<Pick<Task, 'done'>>;

export type TaskUpdate = Pick<Task, 'task' | 'done'>;

export const TaskValidationSchema = z.object({
  task: z.string().nonempty(),
  done: z.boolean().optional(),
});
