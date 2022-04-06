import { z } from 'zod';
import bcrypt from 'bcrypt';

export class User {
  user_id!: number;
  email!: string;
  password!: string;
  name!: string;
  verified!: boolean;
  created_at!: Date;
  updated_at!: Date;
}

export class UserInsert {
  email: string;
  password: string;
  name: string;
  verified?: boolean;

  constructor(data: UserInsert) {
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.verified = data.verified;
  }
}

export const userValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8).transform(p => bcrypt.hashSync(p, 10)),
  name: z.string().nonempty(),
});