import { endpoints } from '@blogfolio/types/Project';
import axiosWithEndpoint from '../util/axiosWithEndpoint';
import { InferEndpoint } from '@blogfolio/types/Endpoint';

type ControllerSchema = typeof endpoints;

type ProjectUpdateDetails = Omit<
  InferEndpoint<ControllerSchema['Put']>['request']['body'],
  'projectID'
>;

export function editProject(projectID: string, details: ProjectUpdateDetails) {
  return axiosWithEndpoint<ControllerSchema['Put']>('put', '/api/projects', {
    projectID,
    ...details,
  });
}
