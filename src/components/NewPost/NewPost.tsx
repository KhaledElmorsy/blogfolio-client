import {
  title as zTitle,
  summary as zSummary,
  slug as zSlug,
} from '@blogfolio/types/Post';
import { getPostBySlug, createPost } from '@/services/api/posts';
import { useUserContext } from '@/contexts/UserContext';
import { Button, RefinedInput } from '..';
import { useRefinedState } from '@/hooks';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { ErrorCode, SuccessCode } from '@blogfolio/types/Response';
import { useNavigate } from 'react-router-dom';
import rehypeSanitize from 'rehype-sanitize';
import style from './NewPost.module.scss';

export function NewPost() {
  const { user } = useUserContext();
  const username = user?.username;
  const [title, setTitle, titleErr] = useRefinedState(zTitle, '');
  const [summary, setSummary, summaryErr] = useRefinedState(zSummary, '');
  const [body, setBody] = useState<string>('');
  const [slug, setSlug, slugErr] = useRefinedState(zSlug, '');
  const [slugUsed, setSlugUsed] = useState(false);

  const navigate = useNavigate();

  const postIsValid =
    !titleErr.length &&
    !summaryErr.length &&
    !slugErr.length &&
    body.length &&
    !slugUsed;

  useEffect(() => {
    getPostBySlug(slug, username!)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setSlugUsed(true);
        } else if (res.status === ErrorCode.NotFound) {
          setSlugUsed(false);
        } else {
          throw 'Something went wrong checking the slug';
        }
      })
      .catch(console.error);
  }, [slug, username]);

  useEffect(() => {
    if (summary === '') setSummary(null);
  }, [summary, setSummary]);

  function createNewPost({ visible = true } = {}) {
    createPost({ body, title, summary, slug, visible })
      .then((res) => {
        if (res.status !== SuccessCode.Created) {
          throw new Error('Couldnt create post');
        }
        navigate('/posts');
      })
      .catch(console.error);
  }

  return (
    <div className={style.container}>
      <RefinedInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        errors={titleErr}
      />
      <RefinedInput
        label="Summary"
        value={summary ?? ''}
        onChange={(e) => setSummary(e.target.value)}
        errors={summaryErr}
      />
      <RefinedInput
        label="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        errors={slugErr.concat(slugUsed ? ['Slug is not available'] : [])}
      />
      <br />
      <MDEditor
        value={body}
        onChange={setBody}
        preview="edit"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <div className={style.buttonContainer}>
        <Button
          text="Save as draft"
          onClick={() => createNewPost({ visible: false })}
          disabled={!postIsValid}
        />
        <Button
          text="Post"
          onClick={() => createNewPost({ visible: true })}
          disabled={!postIsValid}
        />
      </div>
    </div>
  );
}
