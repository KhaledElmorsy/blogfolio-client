import { endpoints } from '@blogfolio/types/Authentication';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function login(username: string, password: string) {
  return axiosWithEndpoint<ControllerSchema['PostLogin']>(
    'post',
    '/api/login',
    { password, username }
  );
}

export function logout() {
  return axiosWithEndpoint<ControllerSchema['PostLogout']>(
    'post',
    '/api/logout'
  );
}
