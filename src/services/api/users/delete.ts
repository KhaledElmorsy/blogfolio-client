import { endPoints } from '@blogfolio/types/User';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endPoints;

export function deleteUser() {
  return axiosWithEndpoint<ControllerSchema['Delete']>('delete', '/api/users');
}
