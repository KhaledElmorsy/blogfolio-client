import { getPostByUsername } from '@/services/api/posts';
import { useParams, useNavigate } from 'react-router-dom';
import { PostList, type LightPost } from '../PostList/PostList';
import { SearchBar } from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { SuccessCode } from '@blogfolio/types/Response';
import style from './UserPosts.module.scss';

export function UserPosts() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<LightPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await getPostByUsername(username!, {
        search: search === '' ? undefined : search,
      });
      if (response.status !== SuccessCode.Ok) {
        navigate('/');
        throw new Error('Couldnt fetch users posts');
      }
      console.log(username, response);
      setPosts(response.body.posts);
    }

    fetchPosts().catch(console.error);
  }, [search, navigate, username]);

  return (
    <div className={style.outerContainer}>
      <div className={style.mainBlock}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className={style.listContainer}>
          {posts.length ? (
            <PostList posts={posts} />
          ) : (
            <div className={style.nothingMessage}>Nothing here..</div>
          )}
        </div>
      </div>
    </div>
  );
}
