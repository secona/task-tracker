import { nanoid } from 'nanoid';
import db from '~/db';
import { BasicDAO } from '~/interfaces/DAO';
import { Project, ProjectInsert, ProjectUpdate } from './project.model';

class ProjectDAO extends BasicDAO<Project, ProjectInsert, ProjectUpdate> {
  returnFields: '*' | (keyof Project)[] = [
    'project_id',
    'description',
    'display_color',
    'created_at',
    'updated_at',
  ];

  async create(data: ProjectInsert): Promise<Project> {
    const rows = await db('projects')
      .insert({ ...data, project_id: nanoid(11) })
      .returning(this.returnFields)
    return rows[0] as Project;
  }

  async get(project_id: string): Promise<Project | undefined> {
    return db('projects')
      .select(this.returnFields)
      .where({ project_id })
      .first();
  }

  async update(project_id: string, data: ProjectUpdate): Promise<Project | undefined> {
    const rows = await db('projects')
      .update(data, this.returnFields)
      .where({ project_id });
    return rows[0];
  }

  async del(project_id: string): Promise<number> {
    return db('projects').delete().where({ project_id });
  }
}

export const projectDAO = new ProjectDAO;