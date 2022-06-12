import { Project, ProjectResponse } from './project.model';

export const projectUtil = {
  omitSensitive(project: undefined | Project | Project[]) {
    if (!project) return;
    if (Array.isArray(project))
      return project.map(p => new ProjectResponse(p));
    return new ProjectResponse(project);
  }
}