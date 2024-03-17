import { getUserPosts } from '@/services/api/posts';
import { PostList, type LightPost } from '../PostList/PostList';
import { useState, useEffect } from 'react';
import { SuccessCode } from '@blogfolio/types/Response';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import style from './LoggedUser.module.scss';

export function LoggedUserPosts() {
  const [posts, setPosts] = useState<LightPost[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getPosts() {
      const response = await getUserPosts({
        drafts: showDrafts,
        search: search === '' ? undefined : search,
      });
      if (response.status !== SuccessCode.Ok) {
        throw new Error("Couldn't get user posts");
      }
      setPosts(response.body.posts);
    }

    getPosts().catch(console.error);
  }, [showDrafts, search]);

  return (
    <div className={style.pageContainer}>
      <div className={style.draftToggleContainer}>
        <span>Drafts only: </span>
        <input
          type="checkbox"
          checked={showDrafts}
          onChange={(e) => setShowDrafts(e.target.checked)}
        />
      </div>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className={style.listContainer}>
        {posts.length ? (
          <PostList posts={posts} />
        ) : (
          <div className={style.emptyListWarning}>
            Looks like nothing&apos;s here...
          </div>
        )}
      </div>
      <Link to="/posts/new">
        <Button text="Write" />
      </Link>
    </div>
  );
}
