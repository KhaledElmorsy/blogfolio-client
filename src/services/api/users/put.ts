import { endPoints } from '@blogfolio/types/User';
import { InferController } from '@blogfolio/types/Controller';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type UserEndpoints = InferController<typeof endPoints>;
type ControllerSchema = typeof endPoints;

type MiscUserData = UserEndpoints['Put']['request']['body'];

export function updateUserData(data: MiscUserData) {
  return axiosWithEndpoint<ControllerSchema['Put']>('put', '/api/users/', data);
}

export function changePassword(password: string) {
  return axiosWithEndpoint<ControllerSchema['PutPassword']>(
    'put',
    '/api/users/password',
    { password }
  );
}

export function changeEmail(email: string) {
  return axiosWithEndpoint<ControllerSchema['PutEmail']>(
    'put',
    '/api/users/email',
    { email }
  );
}

export function changeUsername(username: string) {
  return axiosWithEndpoint<ControllerSchema['PutUsername']>(
    'put',
    '/api/users/username',
    { username }
  );
}

export function putFollower(targetID: string) {
  return axiosWithEndpoint<ControllerSchema['PutFollower']>(
    'put',
    `/api/users/followers/${targetID}`
  );
}
