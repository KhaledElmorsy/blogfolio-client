import { endpoints } from '@blogfolio/types/Comment';
import axiosWithEndpoint from '../util/axiosWithEndpoint';
import { InferEndpoint } from '@blogfolio/types/Endpoint';

type ControllerSchema = typeof endpoints;

type CommentDetails = InferEndpoint<
  ControllerSchema['Post']
>['request']['body'];

export function createComment(details: CommentDetails) {
  return axiosWithEndpoint<ControllerSchema['Post']>(
    'post',
    '/api/comments',
    details
  );
}
