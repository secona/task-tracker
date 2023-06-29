import axios from 'axios';
import { number, object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';
import { IProject, IProjectEditable } from '.';

export interface ProjectsEditContext {
  projectId: string;
}

export interface ProjectsEditBody extends IProjectEditable {}

export type ProjectsEditResponse = ResponseBody<{ projects: IProject }>;

export interface ProjectsEditAPI
  extends BaseAPI<
    ProjectsEditContext,
    ProjectsEditBody,
    ProjectsEditResponse
  > {}

const edit: ProjectsEditAPI = ({ context, body }) => {
  return axios.patch<ProjectsEditResponse>(
    `/api/projects/${context.projectId}`,
    body
  );
};

edit.validation = object().shape({
  name: string(),
  description: string(),
  color: number(),
});

export default edit;
