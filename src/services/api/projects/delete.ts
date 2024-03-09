import { endpoints } from '@blogfolio/types/Project';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function deleteProject(projectID: string) {
  return axiosWithEndpoint<ControllerSchema['Delete']>(
    'delete',
    `/api/projects/${projectID}`
  );
}
