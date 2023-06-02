import { BaseAPI, ResponseBody } from '..';
import { ITask } from '.';
import axios from 'axios';

export interface TaskGetManyData {
  projectId?: string;
}

export type TaskGetManyResponse = ResponseBody<{
  tasks: ITask[];
}>;

export interface TaskGetManyAPI
  extends BaseAPI<TaskGetManyData, TaskGetManyResponse> {}

const getMany: TaskGetManyAPI = data => {
  return axios.get<TaskGetManyResponse>('/api/tasks', {
    params: {
      projectId: data.projectId,
    },
  });
};

export default getMany;
