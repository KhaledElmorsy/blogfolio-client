import { endpoints } from '@blogfolio/types/Post';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function deletePost(postID: string) {
  return axiosWithEndpoint<ControllerSchema['Delete']>(
    'delete',
    `/api/posts/${postID}`
  );
}
