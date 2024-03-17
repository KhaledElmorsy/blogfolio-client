import MDEditor from '@uiw/react-md-editor';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  type EmoteCount as EmoteCountType,
  type Post,
} from '../PostList/PostList';
import { EmoteCount } from '..';
import { EmotePicker } from '../EmotePicker/EmotePicker';
import { Spinner } from '..';
import { getPostBySlug } from '@/services/api/posts';
import {
  addPostEmote,
  getPostEmoteCounts,
  getPostUserEmotes,
  updatePostEmote,
} from '@/services/api/emotes';
import { useUserContext } from '@/contexts/UserContext';
import { PostProvider } from '@/contexts/PostContext';
import { CommentForm } from '../CommentForm/CommentForm';
import { CommentList } from '../CommentList/CommentList';
import { SuccessCode } from '@blogfolio/types/Response';

import style from './ShowPost.module.scss';

export function ShowPost() {
  const { user } = useUserContext();
  const { slug, username } = useParams();
  const [post, setPost] = useState<Post>();
  const [emoteCounts, setEmoteCounts] = useState<EmoteCountType[]>([]);
  const [userEmote, setUserEmote] = useState<number | null>(null);
  const [refreshComments, setRefreshComments] = useState(false);
  const [loading, setLoading] = useState(true);

  async function pickEmote(emoteID: number) {
    if (!post) return;
    if (!userEmote) {
      await addPostEmote(post?.id, emoteID);
    } else {
      await updatePostEmote(post?.id, emoteID);
    }
    setUserEmote(emoteID);
  }

  useEffect(() => {
    getPostBySlug(slug!, username!)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setPost(res.body.post);
          setLoading(false);
          return;
        }
        throw 'Couldnt fetch post';
      })
      .catch(console.error);
  }, [slug, username]);

  useEffect(() => {
    if (!post) return;
    getPostEmoteCounts([post.id])
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setEmoteCounts(res.body[post.id] ?? []);
        }
      })
      .catch(console.error);
    if (user) {
      getPostUserEmotes([post.id], user.id)
        .then((res) => {
          if (res.status === SuccessCode.Ok) {
            setUserEmote(res.body[0]?.emoteID ?? null);
          }
        })
        .catch(console.error);
    }
  }, [post, user, userEmote]);

  return loading || !post ? (
    <Spinner />
  ) : (
    <PostProvider postID={post?.id}>
      <div className={style.pageContainer}>
        {user?.id === post.userID ? (
          <div className={style.editButtonContainer}>
            <Link to="edit" className={style.editButton}>
              Edit
            </Link>
          </div>
        ) : null}
        <div className={style.titleContainer}>
          <h2 className={style.title}>{post?.title}</h2>
          {post?.summary ? <p className={style.summary}>{post.summary}</p> : null}
          {user ? (
            <EmotePicker
              emoteCounts={emoteCounts}
              onPick={pickEmote}
              pickedEmote={userEmote}
            />
          ) : (
            <EmoteCount emoteCounts={emoteCounts} />
          )}
        </div>
        <MDEditor.Markdown source={post?.body} className={style.postBody} />
        <div className={style.comments}>
          <p className={style.title}>Comments</p>
          <CommentForm refresh={setRefreshComments} />
          <div className={style.commentListContainer}>
            <CommentList refresh={refreshComments} />
          </div>
        </div>
      </div>
    </PostProvider>
  );
}
