import { BaseAPI, ResponseBody } from '..';
import { IProject } from '.';
import axios from 'axios';

export interface ProjectGetManyData {}

export type ProjectGetManyResponse = ResponseBody<{
  projects: IProject[];
}>;

export interface ProjectGetManyAPI
  extends BaseAPI<ProjectGetManyData, ProjectGetManyResponse> {}

const getMany: ProjectGetManyAPI = () => {
  return axios.get<ProjectGetManyResponse>('/api/projects');
};

export default getMany;
