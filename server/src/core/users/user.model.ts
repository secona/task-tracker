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
  email?: string;
  password?: string;
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

  static array(users: User[] | undefined) {
    if (users) return users.map(user => new UserResponse(user));
  }
}

export const userSchemas = new (class {
  create = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1),
  });

  updateProfile = this.create
    .omit({
      email: true,
      password: true,
    })
    .partial();

  updatePassword = z.object({
    current_password: z.string(),
    new_password: z.string().min(8),
  });

  resetPassword = z.object({
    token: z.string(),
    new_password: z.string().min(8),
  });

  updateEmail = this.create.pick({ email: true });

  forgotPassword = this.create.pick({ email: true });
})();
