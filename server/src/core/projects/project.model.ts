export class Project {
  project_id!: string;
  user_id!: number;
  description!: string;
  display_color!: string;
  created_at!: Date;
  updated_at!: Date;
}

export class ProjectInsert {
  user_id: number;
  description: string;
  display_color: string;

  constructor(data: ProjectInsert) {
    this.user_id = data.user_id;
    this.description = data.description;
    this.display_color = data.display_color;
  }
}

export class ProjectUpdate {
  description: string;
  display_color: string;

  constructor(data: ProjectUpdate) {
    this.description = data.description;
    this.display_color = data.display_color;
  }
}