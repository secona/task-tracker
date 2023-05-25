import { BaseAPI, ResponseBody } from '..';
import { Project } from '.';
import axios from 'axios';

export interface ProjectGetManyData {}

export type ProjectGetManyResponse = ResponseBody<{
  projects: Project[];
}>;

export interface ProjectGetManyAPI
  extends BaseAPI<ProjectGetManyData, ProjectGetManyResponse> {}

const getMany = () => {
  return axios.get<ProjectGetManyResponse>('/api/projects');
};

export default getMany;
