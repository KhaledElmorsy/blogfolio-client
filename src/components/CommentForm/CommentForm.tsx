import style from './CommentForm.module.scss';
import { useUserContext } from '@/contexts/UserContext';
import { usePostContext } from '@/contexts/PostContext';
import { createComment, editComment } from '@/services/api/comments';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

interface CommentFormProps {
  parentID?: string;
  initialBody?: string;
  commentID?: string;
}

export function CommentForm({
  parentID,
  commentID,
  initialBody,
}: CommentFormProps) {
  const [body, setBody] = useState(initialBody ?? '');
  const { user } = useUserContext();
  const { postID } = usePostContext();

  function performAction() {
    if (commentID) {
      editComment(commentID, body).catch(console.error);
    } else {
      createComment({ body, postID, parentID })
        .then(() => {
          setBody('');
        })
        .catch(console.error);
    }
  }

  return (
    <div className={style.container}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className={style.input}
        disabled={!user}
      />
      <Button
        className={style.button}
        disabled={!body.length || !user}
        onClick={performAction}
        text={commentID ? 'Update' : 'Post'}
      />
      {!user ? (
        <div>
          <Link to="/login">Login</Link> to post comments!
        </div>
      ) : null}
    </div>
  );
}
