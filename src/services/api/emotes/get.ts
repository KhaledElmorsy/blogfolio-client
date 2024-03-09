import { endpoints } from '@blogfolio/types/Emote';
import axiosWithEndpoint from '../util/axiosWithEndpoint';

type ControllerSchema = typeof endpoints;

export function getCurrentEmotes() {
  return axiosWithEndpoint<ControllerSchema['Get']>('get', '/api/emotes/');
}
