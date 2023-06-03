import axios from 'axios';
import { SchemaOf, boolean, object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';
import { ITaskEditable } from '../tasks';

export interface ProjectsNewTaskData extends ITaskEditable {
  projectId: string;
}

export type ProjectsNewTaskResponse = ResponseBody;

export interface ProjectsNewTaskAPI
  extends BaseAPI<ProjectsNewTaskData, ProjectsNewTaskResponse> {
  validation: SchemaOf<ProjectsNewTaskData>;
}

const newTask: ProjectsNewTaskAPI = ({ projectId, ...data }) => {
  return axios.post<ProjectsNewTaskResponse>(
    `/api/projects/${projectId}/tasks`,
    data
  );
};

newTask.validation = object().shape({
  projectId: string().required(),
  task: string().required(),
  description: string(),
  done: boolean(),
});

export default newTask;
