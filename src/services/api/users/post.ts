import { endPoints } from '@blogfolio/types/User';
import { InferController } from '@blogfolio/types/Controller';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type UserEndpoints = InferController<typeof endPoints>;
type ControllerSchema = typeof endPoints;

export function signUp(details: UserEndpoints['Post']['request']['body']) {
  return axiosWithEndpoint<ControllerSchema['Post']>(
    'post',
    '/api/users',
    details
  );
}
