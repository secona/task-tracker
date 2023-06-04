import { QueryOptions } from '@tanstack/react-query';
import { projectsAPI } from './api/projects';
import { tasksAPI } from './api/tasks';

export const queries = {
  projects: () => ({
    queryKey: ['projects', 'all'],
    queryFn: async () => {
      return projectsAPI.getMany();
    },
  }),
  tasks: (projectId?: string) => ({
    queryKey: ['projects', projectId, 'tasks'],
    queryFn: async () => {
      return tasksAPI.getMany({ context: { projectId } });
    },
  }),
} satisfies Record<string, () => QueryOptions>;
