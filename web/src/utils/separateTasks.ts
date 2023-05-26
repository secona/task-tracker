import { Task } from '@/api/tasks';

export const separateTasks = (tasks?: Task[]) => {
  const result = {
    unfinished: [] as Task[],
    finished: [] as Task[],
  };

  if (tasks === undefined) return result;

  tasks.forEach(task => {
    if (task.done) result.finished.push(task);
    else result.unfinished.push(task);
  });

  return result;
};
