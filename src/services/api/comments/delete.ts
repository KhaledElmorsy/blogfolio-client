import { endpoints } from '@blogfolio/types/Comment';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function deleteComment(commentID: string) {
  return axiosWithEndpoint<ControllerSchema['Delete']>(
    'delete',
    `/api/comments/${commentID}`
  );
}
