export class User {
  user_id!: number;
  email!: string;
  name!: string;
  picture!: string;
  created_at!: Date;
  updated_at!: Date;
}

export class UserInsert {
  email: string;
  name: string;
  picture: string;

  constructor(data: UserInsert) {
    this.email = data.email;
    this.name = data.name;
    this.picture = data.picture;
  }
}