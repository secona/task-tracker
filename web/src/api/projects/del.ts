import axios from 'axios';
import { BaseAPI, ResponseBody } from '..';
import { IProjectEditable } from '.';

export interface ProjectsDeleteContext {
  projectId: string;
}

export interface ProjectsDeleteBody {}

export type ProjectsDeleteResponse = ResponseBody;

export interface ProjectsDeleteAPI
  extends BaseAPI<
    ProjectsDeleteContext,
    ProjectsDeleteBody,
    ProjectsDeleteResponse
  > {}

const del: ProjectsDeleteAPI = ({ context }) => {
  return axios.delete<ProjectsDeleteResponse>(
    `/api/projects/${context.projectId}`
  );
};

export default del;
