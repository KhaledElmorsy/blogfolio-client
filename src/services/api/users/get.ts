import { endPoints } from '@blogfolio/types/User';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endPoints;

/* =========================== SINGLE USER ================================== */

export function getLoggedUser() {
  return axiosWithEndpoint<ControllerSchema['GetMe']>('get', '/api/users/me');
}

export function getUserData(userID: string) {
  return axiosWithEndpoint<ControllerSchema['Get']>(
    'get',
    `/api/users/${userID}?fields=bio,fullName,lastName,photoFull,photoSmall,followerCount,followingCount`
  );
}

/* ============================= USER LISTS ================================= */

interface UsernameListPagination {
  nextID?: string;
  count?: number;
}

const userListFieldsParam =
  'fields=bio,photoSmall,firstName,lastName,followerCount,followingCount';

export function searchUsername(
  username: string,
  { nextID, count = 10 }: UsernameListPagination = {}
) {
  return axiosWithEndpoint<ControllerSchema['GetSearchUsername']>(
    'get',
    `/api/users/s/username/${username}?${userListFieldsParam}`,
    {},
    { params: { nextID, limit: count } }
  );
}

export function searchAny(
  searchText: string,
  { nextID, count = 10 }: UsernameListPagination = {}
) {
  return axiosWithEndpoint<ControllerSchema['GetSearchAny']>(
    'get',
    `/api/users/s/any/${searchText}?${userListFieldsParam}`,
    {},
    { params: { nextID, limit: count } }
  );
}

export function getFollowers(
  userID: string,
  { nextID, count = 20 }: UsernameListPagination = {}
) {
  return axiosWithEndpoint<ControllerSchema['GetFollowers']>(
    'get',
    `/api/users/${userID}/followers?${userListFieldsParam}`,
    {},
    { params: { nextID, limit: count } }
  );
}

export function getFollowing(
  userID: string,
  { nextID, count = 20 }: UsernameListPagination = {}
) {
  return axiosWithEndpoint<ControllerSchema['GetFollowers']>(
    'get',
    `/api/users/${userID}/follows?${userListFieldsParam}`,
    {},
    { params: { nextID, limit: count } }
  );
}

/* ============================= BOOLEANS =================================== */

export function checkFollow(userID: string, targetID: string) {
  return axiosWithEndpoint<ControllerSchema['GetCheckFollow']>(
    'get',
    `/api/users/${userID}/follows/${targetID}`
  );
}

export function checkEmail(email: string) {
  return axiosWithEndpoint<ControllerSchema['GetExistsEmail']>(
    'get',
    `/api/users/t/exists/email/${email}`
  );
}

export function checkUsername(username: string) {
  return axiosWithEndpoint<ControllerSchema['GetExistsEmail']>(
    'get',
    `/api/users/t/exists/username/${username}`
  );
}
