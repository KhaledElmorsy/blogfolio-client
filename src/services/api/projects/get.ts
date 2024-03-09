import { endpoints } from '@blogfolio/types/Project';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function getProject(projectID: string) {
  return axiosWithEndpoint<ControllerSchema['GetProject']>(
    'get',
    `/api/projects/${projectID}`
  );
}

export function getUserProjects(userID: string) {
  return axiosWithEndpoint<ControllerSchema['GetUserProjects']>(
    'get',
    '/api/projects',
    {},
    { params: { userID } }
  );
}


