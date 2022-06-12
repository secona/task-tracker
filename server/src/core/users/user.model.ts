import { z } from 'zod';
import bcrypt from 'bcrypt';

export interface User {
  user_id: number;
  email: string;
  password: string;
  name: string;
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserInsert {
  email: string;
  password: string;
  name: string;
  verified?: boolean;
}

export interface UserUpdate {
  name?: string;
  verified?: boolean;
}

export class UserResponse {
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;

  constructor(user: User) {
    this.email = user.email;
    this.name = user.name;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}

export const userValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8).transform(p => bcrypt.hashSync(p, 10)),
  name: z.string().nonempty(),
});