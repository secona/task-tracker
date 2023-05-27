import { QueryOptions } from '@tanstack/react-query';
import projects from './api/projects';
import tasks from './api/tasks';

export const queries = {
  projects: () => ({
    queryKey: ['projects', 'all'],
    queryFn: async () => {
      return projects.getMany({});
    },
  }),
  tasks: (projectId?: string) => ({
    queryKey: ['projects', projectId, 'tasks'],
    queryFn: async () => {
      return tasks.getMany({ projectId });
    },
  }),
} satisfies Record<string, () => QueryOptions>;
