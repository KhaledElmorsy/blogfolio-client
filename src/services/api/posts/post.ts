import { endpoints } from '@blogfolio/types/Post';
import axiosWithEndpoint from '../util/axiosWithEndpoint';
import { InferEndpoint } from '@blogfolio/types/Endpoint';

type ControllerSchema = typeof endpoints;

type PostDetails = InferEndpoint<ControllerSchema['Post']>['request']['body'];

export function createPost(details: PostDetails) {
  return axiosWithEndpoint<ControllerSchema['Post']>(
    'post',
    '/api/posts/',
    details
  );
}
