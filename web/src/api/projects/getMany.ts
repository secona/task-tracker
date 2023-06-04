import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';
import { IProject } from '.';

export interface ProjectsGetManyContext {}

export interface ProjectsGetManyBody {}

export type ProjectsGetManyResponse = ResponseBody<{
  projects: IProject[];
}>;

export interface ProjectsGetManyAPI
  extends BaseAPI<
    ProjectsGetManyContext,
    ProjectsGetManyBody,
    ProjectsGetManyResponse
  > {}

const getMany: ProjectsGetManyAPI = () => {
  return axios.get<ProjectsGetManyResponse>('/api/projects');
};

export default getMany;
