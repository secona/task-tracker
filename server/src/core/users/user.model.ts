import { z } from 'zod';

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

export const userSchemas = new class {
  create = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().nonempty(),
  });

  updateProfile = this.create.omit({
    email: true,
    password: true,
  });
}
