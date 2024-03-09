import { endpoints } from '@blogfolio/types/Project';
import axiosWithEndpoint from '../util/axiosWithEndpoint';
import { InferEndpoint } from '@blogfolio/types/Endpoint';

type ControllerSchema = typeof endpoints;

type ProjectDetails = InferEndpoint<
  ControllerSchema['Post']
>['request']['body'];

export function createProject(details: ProjectDetails) {
  return axiosWithEndpoint<ControllerSchema['Post']>(
    'post',
    '/api/projects',
    details
  );
}
