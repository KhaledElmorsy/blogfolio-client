import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post } from '../PostList/PostList';
import { Spinner } from '..';
import { getPostBySlug } from '@/services/api/posts';
import { SuccessCode } from '@blogfolio/types/Response';

import style from './ShowPost.module.scss';

export function ShowPost() {
  const { slug, username } = useParams();
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(true);

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

  return loading ? (
    <Spinner />
  ) : (
    <div className={style.pageContainer}>
      <div className={style.titleContainer}>
        <h2 className={style.title}>{post?.title}</h2>
        {post?.summary ? <p>{post.summary}</p> : null}
      </div>
      <MDEditor
        hideToolbar={true}
        value={post?.body}
        preview="preview"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
}
