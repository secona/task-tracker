import { nanoid } from 'nanoid';
import { db } from '~/clients';
import { Project, ProjectInsert, ProjectUpdate } from './project.model';

export const projectRepository = {
  async create(data: ProjectInsert): Promise<Project> {
    const rows = await db('projects')
      .insert({ ...data, project_id: nanoid(11) })
      .returning('*');
    return rows[0];
  },

  getOne(where: Partial<Project>): Promise<Project | undefined> {
    return db('projects').select('*').where(where).first();
  },

  getMany(where: Partial<Project>): Promise<Project[] | undefined> {
    return db('projects').select('*').where(where);
  },

  async update(
    where: Partial<Project>,
    data: ProjectUpdate
  ): Promise<Project | undefined> {
    const rows = await db('projects')
      .update(data, '*')
      .where(where);
    return rows[0];
  },

  del(where: Partial<Project>): Promise<number> {
    return db('projects').delete().where(where);
  },
};
