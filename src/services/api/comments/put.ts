import { endpoints } from '@blogfolio/types/Comment';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function editComment(commentID: string, body: string) {
  return axiosWithEndpoint<ControllerSchema['Put']>(
    'put',
    `/api/comments/${commentID}`,
    { body }
  );
}
