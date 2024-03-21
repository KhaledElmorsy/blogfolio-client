import { usePostContext } from '@/contexts/PostContext';
import { getComments } from '@/services/api/comments';
import { SuccessCode } from '@blogfolio/types/Response';
import { useEffect, useState } from 'react';
import { Comment as CommentTypes } from '@blogfolio/types';
import { z } from 'zod';
import { getCommentEmoteCounts } from '@/services/api/emotes';
import { type EmoteCount } from '../PostList/PostList';
import { Spinner } from '../Spinner/Spinner';
import { Comment } from '../Comment/Comment';
import { useCommentRefresh } from '@/contexts/CommentRefreshContext';

type CommentType = z.infer<(typeof CommentTypes)['comment']>;

export function CommentList() {
  const { postID } = usePostContext();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [emoteCounts, setEmoteCounts] = useState<Record<string, EmoteCount[]>>(
    {}
  );

  const { watchRefresh } = useCommentRefresh();

  useEffect(() => {
    getComments({ postID })
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setComments(res.body.comments);
        }
      })
      .catch(console.error);
  }, [postID, watchRefresh]);

  useEffect(() => {
    getCommentEmoteCounts(comments.map(({ id }) => id))
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setEmoteCounts(res.body);
        }
      })
      .catch(console.error);
  }, [comments]);

  return !comments ? (
    <Spinner />
  ) : (
    comments.map((comment) => (
      <Comment
        key={comment.id}
        emoteCounts={emoteCounts[comment.id] ?? []}
        {...comment}
      />
    ))
  );
}
