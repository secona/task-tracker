import axios from 'axios';
import { boolean, object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';
import { ITask, ITaskEditable } from '.';

export interface TasksEditContext {
  taskId: string;
}

export interface TasksEditBody extends ITaskEditable {}

export type TasksEditResponse = ResponseBody<{ task: ITask }>;

export interface TasksEditProjectAPI
  extends BaseAPI<TasksEditContext, TasksEditBody, TasksEditResponse> {}

const edit: TasksEditProjectAPI = ({ context, body }) => {
  return axios.patch<TasksEditResponse>(`/api/tasks/${context.taskId}`, body);
};

edit.validation = object().shape({
  task: string().required(),
  description: string(),
  done: boolean(),
});

export default edit;
