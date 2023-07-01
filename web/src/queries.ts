import { QueryOptions } from '@tanstack/react-query';
import { projectsAPI } from './api/projects';
import { tasksAPI } from './api/tasks';
import { authAPI } from './api/auth';

export type ProjectsQuery = Awaited<
  ReturnType<typeof projectsAPI.getMany>
>['data']['projects'];
export type TasksQuery = Awaited<
  ReturnType<typeof tasksAPI.getMany>
>['data']['tasks'];

export const queries = {
  sessions: () => ({
    queryKey: ['sessions'],
    queryFn: async () => {
      return authAPI.sessions().then(result => result.data.sessions);
    },
  }),
  projects: () => ({
    queryKey: ['projects', 'all'],
    queryFn: async () => {
      // await new Promise(r => setTimeout(r, 5000));
      return projectsAPI.getMany().then(result => result.data.projects);
    },
  }),
  tasks: (projectId?: string) => ({
    queryKey: ['projects', projectId, 'tasks'],
    queryFn: async () => {
      // await new Promise(r => setTimeout(r, 5000));
      return tasksAPI
        .getMany({ context: { projectId } })
        .then(result => result.data.tasks);
    },
  }),
} satisfies Record<string, () => QueryOptions>;
