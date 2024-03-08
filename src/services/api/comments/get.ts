import { endpoints } from '@blogfolio/types/Comment';
import axiosWithEndpoint from '../util/axiosWithEndpoint';
import { InferEndpoint } from '@blogfolio/types/Endpoint';

type ControllerSchema = typeof endpoints;

/* ============================ SINGLE COMMENT ============================== */

export function getComment(commentID: string) {
  return axiosWithEndpoint<ControllerSchema['Get']>(
    'get',
    `/api/comments/${commentID}`
  );
}

/* =========================== COMMENT LIST ================================= */

type GetCommentsParams = InferEndpoint<
  ControllerSchema['GetByRelation']
>['request']['query'];

export function getComments(params: GetCommentsParams) {
  return axiosWithEndpoint<ControllerSchema['GetByRelation']>(
    'get',
    '/api/comments',
    {},
    { params }
  );
}
