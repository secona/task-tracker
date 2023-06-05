import axios from 'axios';
import { BaseAPI, NEW_ResponseBody, NEW_axios } from '..';
import { ITask } from '.';

export interface TasksGetManyContext {
  projectId?: string;
}

export interface TasksGetManyBody {}

export type TasksGetManyResponse = NEW_ResponseBody<{
  tasks: ITask[];
}>;

export interface TasksGetManyAPI
  extends BaseAPI<
    TasksGetManyContext,
    TasksGetManyBody,
    TasksGetManyResponse
  > {}

const getMany: TasksGetManyAPI = ({ context }) => {
  return NEW_axios.get<TasksGetManyResponse>('/api/tasks', {
    params: {
      projectId: context.projectId,
    },
  });
};

export default getMany;
