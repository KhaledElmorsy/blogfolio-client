import { endpoints } from '@blogfolio/types/Post';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

/* ============================ SINGLE POST ================================= */

export function getPost(postID: string) {
  return axiosWithEndpoint<ControllerSchema['Get']>(
    'get',
    `/api/posts/${postID}`
  );
}

export function getPostBySlug(slug: string, username: string) {
  return axiosWithEndpoint<ControllerSchema['GetBySlug']>(
    'get',
    `/api/user/${username}/posts/${slug}`
  );
}

/* ============================ POST ARRAYS ================================= */

interface PostListOptions {
  nextID?: string;
  count?: number;
  sort?: 'date' | 'views';
}

export function searchPosts(searchText: string, options: PostListOptions = {}) {
  return axiosWithEndpoint<ControllerSchema['GetSearch']>(
    'get',
    `/api/posts/`,
    {},
    { params: { search: searchText, ...options } }
  );
}

export function getPostByUsername(username: string, options: PostListOptions) {
  return axiosWithEndpoint<ControllerSchema['GetByUsername']>(
    'get',
    `/api/user/${username}/posts`,
    {},
    { params: options }
  );
}

interface UserPostListOptions extends PostListOptions {
  drafts?: boolean;
  search?: string;
}

export function getUserPosts(options: UserPostListOptions) {
  return axiosWithEndpoint<ControllerSchema['GetByUserID']>(
    'get',
    '/api/posts/me',
    {},
    { params: options }
  );
}
