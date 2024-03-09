import { endpoints } from '@blogfolio/types/Emote';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

/* ============================ POST EMOTES ================================= */

export function addPostEmote(postID: string, emoteID: number) {
  return axiosWithEndpoint<ControllerSchema['PostNewPostEmote']>(
    'post',
    '/api/emotes/post',
    { emoteID, postID }
  );
}

export function getPostEmoteCounts(postIDs: string[]) {
  return axiosWithEndpoint<ControllerSchema['PostGetPostEmoteCounts']>(
    'post',
    '/api/emotes/post/get/counts',
    { postIDs }
  );
}

export function getPostUserEmotes(postIDs: string[], userID: string) {
  return axiosWithEndpoint<ControllerSchema['PostGetPostEmotes']>(
    'post',
    '/api/emotes/post/get',
    { ids: postIDs, userID }
  );
}

/* ========================== COMMENT EMOTES ================================ */

export function addCommentEmote(commentID: string, emoteID: number) {
  return axiosWithEndpoint<ControllerSchema['PostNewCommentEmote']>(
    'post',
    '/api/emotes/comment',
    { commentID, emoteID }
  );
}

export function getCommentEmoteCounts(commentIDs: string[]) {
  return axiosWithEndpoint<ControllerSchema['PostGetCommentEmoteCounts']>(
    'post',
    '/api/emotes/comment/get/counts',
    { commentIDs }
  );
}

export function getCommentUserEmotes(commentIDs: string[], userID: string) {
  return axiosWithEndpoint<ControllerSchema['PostGetCommentEmotes']>(
    'post',
    '/api/emotes/comment/get',
    { ids: commentIDs, userID }
  );
}
