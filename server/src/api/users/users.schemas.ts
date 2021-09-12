import { Task } from '../tasks/tasks.schemas';

export interface User {
  user_id: string;
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
