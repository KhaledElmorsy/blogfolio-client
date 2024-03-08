import { endpoints } from '@blogfolio/types/Post';
import axiosWithEndpoint from '../util/axiosWithEndpoint';
import { InferEndpoint } from '@blogfolio/types/Endpoint';

type ControllerSchema = typeof endpoints;

type PostUpdateDetails = InferEndpoint<
  ControllerSchema['Put']
>['request']['body'];
export function updatePost(postID: string, details: PostUpdateDetails) {
  return axiosWithEndpoint<ControllerSchema['Put']>(
    'put',
    `/api/posts/${postID}`,
    details
  );
}

export function addPostView(postID: string) {
  return axiosWithEndpoint<ControllerSchema['PutView']>(
    'get',
    `/api/posts/${postID}/view`
  );
}
