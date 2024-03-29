import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';
import { ITask } from '.';

export interface TasksGetManyContext {
  projectId?: string;
}

export interface TasksGetManyBody {}

export type TasksGetManyResponse = ResponseBody<{
  tasks: ITask[];
}>;

export interface TasksGetManyAPI
  extends BaseAPI<
    TasksGetManyContext,
    TasksGetManyBody,
    TasksGetManyResponse
  > {}

const getMany: TasksGetManyAPI = ({ context }) => {
  return axios.get<TasksGetManyResponse>('/api/tasks', {
    params: {
      projectId: context.projectId,
    },
  });
};

export default getMany;
