import { Comment as CommentTypes } from '@blogfolio/types';
import { z } from 'zod';
import { EmoteCount as EmoteCountType } from '../PostList/PostList';
import { EmoteCount } from '../EmoteCount/EmoteCount';
import { useUserContext } from '@/contexts/UserContext';
import { getUserData } from '@/services/api/users';
import {
  addCommentEmote,
  getCommentEmoteCounts,
  getCommentUserEmotes,
  updateCommentEmote,
} from '@/services/api/emotes';
import { deleteComment } from '@/services/api/comments';
import { useEffect, useState } from 'react';
import { type Resources } from '@blogfolio/types/User';
import { SuccessCode } from '@blogfolio/types/Response';
import style from './Comment.module.scss';
import { EmotePicker } from '../EmotePicker/EmotePicker';
import { Link } from 'react-router-dom';
import { useCommentRefresh } from '@/contexts/CommentRefreshContext';

type Comment = z.infer<(typeof CommentTypes)['comment']>;
type User = Resources['QueriedUser'];

interface CommentProps extends Comment {
  emoteCounts: EmoteCountType[];
}

export function Comment({
  id,
  userID,
  emoteCounts: initEmoteCounts,
  body,
  createdAt,
}: CommentProps) {
  const { user } = useUserContext();
  const [author, setAuthor] = useState<User | null>();
  const [emoteCounts, setEmoteCounts] = useState(initEmoteCounts);
  const [pickedEmote, setPickedEmote] = useState<number | null>(null);
  const { refresh } = useCommentRefresh();

  const cDate = new Date(createdAt);

  async function pickEmote(emoteID: number) {
    if (!pickedEmote) {
      await addCommentEmote(id, emoteID);
    } else {
      await updateCommentEmote(id, emoteID);
    }
    setPickedEmote(emoteID);
  }

  useEffect(() => {
    getCommentEmoteCounts([id])
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setEmoteCounts(res.body[id] ?? []);
        }
      })
      .catch(console.error);

    getCommentUserEmotes([id], user?.id as string)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setPickedEmote(res.body[0]?.emoteID ?? null);
        }
      })
      .catch(console.error);
  }, [pickedEmote, id, user?.id]);

  useEffect(() => {
    // In case of deleted comments. Keep the node but remove the author (and body).
    if (!userID) {
      setAuthor(null);
      return;
    }
    getUserData(userID)
      .then((res) => {
        if (res.status !== SuccessCode.Ok) {
          throw 'Couldnt get comment author';
        }
        setAuthor(res.body.user);
      })
      .catch(console.error);
  }, [userID]);

  function handleDeleteComment() {
    deleteComment(id)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          refresh();
        }
      })
      .catch(console.error);
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p className={style.author}>
          {<Link to={`/users/${author?.username}`}>{author?.username}</Link> ??
            'Deleted'}
        </p>
        {author?.id !== user?.id ? null : (
          <span className={style.deleteButton} onClick={handleDeleteComment}>
            x
          </span>
        )}
      </div>
      <p className={style.body}>{body}</p>
      <div className={style.footer}>
        {user ? (
          <EmotePicker
            emoteCounts={emoteCounts}
            pickedEmote={pickedEmote}
            size="small"
            onPick={pickEmote}
          />
        ) : (
          <EmoteCount emoteCounts={emoteCounts} />
        )}
        <span>{cDate.toLocaleDateString('en-GB')}</span>
      </div>
    </div>
  );
}
