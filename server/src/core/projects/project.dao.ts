import { nanoid } from 'nanoid';
import { db } from '~/clients';
import { BasicDAO } from '~/interfaces/DAO';
import { Project, ProjectInsert, ProjectUpdate } from './project.model';

class ProjectDAO implements BasicDAO<Project, ProjectInsert, ProjectUpdate> {
  returnFields: (keyof Project)[] = [
    'project_id',
    'name',
    'description',
    'color',
    'created_at',
    'updated_at',
  ];

  async create(data: ProjectInsert): Promise<Project> {
    const rows = await db('projects')
      .insert({ ...data, project_id: nanoid(11) })
      .returning(this.returnFields);
    return rows[0] as Project;
  }

  getOne(where: Partial<Project>): Promise<Project | undefined> {
    return db('projects').select(this.returnFields).where(where).first();
  }

  getMany(where: Partial<Project>): Promise<Project[] | undefined> {
    return db('projects').select(this.returnFields).where(where);
  }

  async update(
    where: Partial<Project>,
    data: ProjectUpdate
  ): Promise<Project | undefined> {
    const rows = await db('projects')
      .update(data, this.returnFields)
      .where(where);
    return rows[0];
  }

  del(where: Partial<Project>): Promise<number> {
    return db('projects').delete().where(where);
  }
}

export const projectDAO = new ProjectDAO();
