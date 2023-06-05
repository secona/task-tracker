import axios from 'axios';
import { boolean, object, string } from 'yup';
import { BaseAPI, NEW_ResponseBody, NEW_axios } from '..';
import { ITaskEditable } from '../tasks';

export interface ProjectsNewTaskContext {
  projectId: string;
}

export interface ProjectsNewTaskBody extends ITaskEditable {}

export type ProjectsNewTaskResponse = NEW_ResponseBody;

export interface ProjectsNewTaskAPI
  extends BaseAPI<
    ProjectsNewTaskContext,
    ProjectsNewTaskBody,
    ProjectsNewTaskResponse
  > {}

const newTask: ProjectsNewTaskAPI = ({ context, body }) => {
  return NEW_axios.post<ProjectsNewTaskResponse>(
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
