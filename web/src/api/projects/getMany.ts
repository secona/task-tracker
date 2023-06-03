import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';
import { IProject } from '.';

export interface ProjectsGetManyData {}

export type ProjectsGetManyResponse = ResponseBody<{
  projects: IProject[];
}>;

export interface ProjectsGetManyAPI
  extends BaseAPI<ProjectsGetManyData, ProjectsGetManyResponse> {}

const getMany: ProjectsGetManyAPI = () => {
  return axios.get<ProjectsGetManyResponse>('/api/projects');
};

export default getMany;
