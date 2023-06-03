import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';
import { ITask } from '.';

export interface TasksGetManyData {
  projectId?: string;
}

export type TasksGetManyResponse = ResponseBody<{
  tasks: ITask[];
}>;

export interface TasksGetManyAPI
  extends BaseAPI<TasksGetManyData, TasksGetManyResponse> {}

const getMany: TasksGetManyAPI = data => {
  return axios.get<TasksGetManyResponse>('/api/tasks', {
    params: {
      projectId: data.projectId,
    },
  });
};

export default getMany;
