import { BaseAPI, NEW_ResponseBody, NEW_axios } from '..';
import { IProject } from '.';

export interface ProjectsGetManyContext {}

export interface ProjectsGetManyBody {}

export type ProjectsGetManyResponse = NEW_ResponseBody<{
  projects: IProject[];
}>;

export interface ProjectsGetManyAPI
  extends BaseAPI<
    ProjectsGetManyContext,
    ProjectsGetManyBody,
    ProjectsGetManyResponse
  > {}

const getMany: ProjectsGetManyAPI = () => {
  return NEW_axios.get<ProjectsGetManyResponse>('/api/projects');
};

export default getMany;
