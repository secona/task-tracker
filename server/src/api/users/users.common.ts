import { Task } from '../tasks/tasks.common';

export interface User {
  user_id: number;
  email: string;
  name: string;
  picture: string;
  created_at: Date;
  updated_at: Date;
}

export type UserInsert = Pick<User, 'email' | 'name' | 'picture'>;

export interface UserJoined extends User {
  tasks: Task[];
}
