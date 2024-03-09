import { endpoints } from '@blogfolio/types/Emote';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function updatePostEmote(postID: string, emoteID: number) {
  return axiosWithEndpoint<ControllerSchema['PutPostEmote']>(
    'put',
    '/api/emotes/post',
    { emoteID, postID }
  );
}

export function updateCommentEmote(commentID: string, emoteID: number) {
  return axiosWithEndpoint<ControllerSchema['PutCommentEmote']>(
    'put',
    '/api/emotes/comment',
    { emoteID, commentID }
  );
}
