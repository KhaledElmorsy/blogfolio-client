import { endpoints } from '@blogfolio/types/Emote';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function deletePostEmote(postID: string) {
  return axiosWithEndpoint<ControllerSchema['DeletePostEmote']>(
    'delete',
    `/api/emotes/post/${postID}`,
  );
}

export function deleteCommentEmote(commentID: string) {
  return axiosWithEndpoint<ControllerSchema['DeleteCommentEmote']>(
    'delete',
    `/api/emotes/comment/${commentID}`,
  );
}
