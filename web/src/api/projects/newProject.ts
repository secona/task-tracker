import axios from 'axios';
import { boolean, number, object, string } from 'yup';
import { BaseAPI, ResponseBody } from '..';
import { IProject, IProjectEditable } from '.';

export interface ProjectsNewProjectContext {}

export interface ProjectsNewProjectBody extends IProjectEditable {}

export type ProjectsNewProjectResponse = ResponseBody<{ project: IProject }>;

export interface ProjectsNewProjectAPI
  extends BaseAPI<
    ProjectsNewProjectContext,
    ProjectsNewProjectBody,
    ProjectsNewProjectResponse
  > {}

const newProject: ProjectsNewProjectAPI = ({ body }) => {
  return axios.post<ProjectsNewProjectResponse>(`/api/projects/`, body);
};

newProject.validation = object().shape({
  name: string().required(),
  description: string(),
  color: number(),
});

export default newProject;
