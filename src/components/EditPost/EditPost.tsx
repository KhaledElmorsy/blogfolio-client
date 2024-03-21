import { getPostBySlug, updatePost, deletePost } from '@/services/api/posts';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { RefinedInput } from '../RefinedInput/RefinedInput';
import { Button } from '../Button/Button';
import {
  title as zTitle,
  summary as zSummary,
  slug as zSlug,
} from '@blogfolio/types/Post';
import { useRefinedState } from '@/hooks';
import { useEffect, useState } from 'react';
import { SuccessCode } from '@blogfolio/types/Response';
import { useUserContext } from '@/contexts/UserContext';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import style from './EditPost.module.scss';

export function EditPost() {
  const { username, slug: currentSlug } = useParams();
  const [title, setTitle, titleErr] = useRefinedState(zTitle, '');
  const [summary, setSummary, summaryErr] = useRefinedState(zSummary, '');
  const [slug, setSlug, slugErr] = useRefinedState(zSlug, currentSlug!);
  const [body, setBody] = useState('');
  const [draft, setDraft] = useState(false);
  const [postID, setPostID] = useState('');
  const [authorID, setAuthorID] = useState('');
  const [slugTaken, setSlugTaken] = useState(false);

  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug === currentSlug) {
      setSlugTaken(false);
      return;
    }
    getPostBySlug(slug, username!)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setSlugTaken(true);
        } else {
          setSlugTaken(false);
        }
      })
      .catch(console.error);
  }, [slug, currentSlug, username]);

  useEffect(() => {
    if (summary === '') setSummary(null);
  }, [summary, setSummary]);

  useEffect(() => {
    getPostBySlug(currentSlug!, username!)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          const { post } = res.body;
          setTitle(post.title);
          setSummary(post.summary);
          setBody(post.body);
          setDraft(!post.visible);
          setPostID(post.id);
          setAuthorID(post.userID);
          setSlug(post.slug);
        }
      })
      .catch(console.error);
  }, [username, setTitle, setSummary, currentSlug, setSlug]);

  function updatePostData() {
    updatePost(postID, { body, slug, summary, title, visible: !draft })
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          navigate('..');
        }
      })
      .catch(console.error);
  }

  function deletePostHandler() {
    deletePost(postID)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          navigate('/posts');
        }
      })
      .catch(console.error);
  }

  return !user ? (
    <Navigate to="/login" />
  ) : user.id !== authorID && authorID ? (
    <Navigate to=".." />
  ) : (
    <div className={style.pageContainer}>
      <div className={style.titleContainer}>
        <RefinedInput
          label="Title"
          placeholder="Title"
          value={title}
          errors={titleErr}
          onChange={(e) => setTitle(e.target.value)}
        />
        <RefinedInput
          label="Summary"
          placeholder="Summary"
          value={summary ?? ''}
          errors={summaryErr}
          onChange={(e) => setSummary(e.target.value)}
        />
        <RefinedInput
          label="Slug"
          placeholder="Slug"
          value={slug}
          errors={slugErr.concat(slugTaken ? ['Slug not available'] : [])}
          onChange={(e) => setSlug(e.target.value)}
        />
        <div className={style.draftContainer}>
          Draft
          <input
            type="checkbox"
            checked={draft}
            onChange={(e) => setDraft(e.target.checked)}
          />
        </div>
      </div>
      <div className={style.bodyContainer}>
        <MDEditor
          height={400}
          value={body}
          onChange={
            setBody as React.Dispatch<React.SetStateAction<string | undefined>>
          }
          preview="edit"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
      <div className={style.footer}>
        <Button
          text="Save"
          onClick={updatePostData}
          disabled={
            !body.length &&
            !!summaryErr.length &&
            !!titleErr.length &&
            !!slugErr.length &&
            slugTaken
          }
        />
        <Button text="Delete" onClick={deletePostHandler} danger/>
      </div>
    </div>
  );
}
