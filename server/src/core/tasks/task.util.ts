import { Task, TaskResponse } from './task.model';

export const taskUtil = {
  omitSensitive(task: undefined | Task | Task[]) {
    if (!task) return;
    if (Array.isArray(task))
      return task.map(t => new TaskResponse(t));
    return new TaskResponse(task);
  }
}