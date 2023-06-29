import axios from 'axios';
import { boolean, object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';
import { ITask, ITaskInsert } from '../tasks';

export interface ProjectsNewTaskContext {
  projectId: string;
}

export interface ProjectsNewTaskBody extends ITaskInsert {}

export type ProjectsNewTaskResponse = ResponseBody<{ task: ITask }>;

export interface ProjectsNewTaskAPI
  extends BaseAPI<
    ProjectsNewTaskContext,
    ProjectsNewTaskBody,
    ProjectsNewTaskResponse
  > {}

const newTask: ProjectsNewTaskAPI = ({ context, body }) => {
  return axios.post<ProjectsNewTaskResponse>(
    `/api/projects/${context.projectId}/tasks`,
    body
  );
};

newTask.validation = object().shape({
  task: string().required(),
  description: string(),
  done: boolean(),
});

export default newTask;
