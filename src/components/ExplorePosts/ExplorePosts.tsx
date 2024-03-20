import style from './ExplorePosts.module.scss';
import { PostList } from '../PostList/PostList';
import { searchPosts } from '@/services/api/posts';
import { SearchBar } from '../SearchBar/SearchBar';
import { useState, useEffect } from 'react';
import type { LightPost } from '../PostList/PostList';
import { SuccessCode } from '@blogfolio/types/Response';

export function ExplorePosts() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<LightPost[]>([]);

  useEffect(() => {
    searchPosts(search)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setPosts(res.body.posts);
        } else {
          setPosts([]);
        }
      })
      .catch(console.error);
  }, [search]);

  return (
    <div className={style.container}>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Look for anything..."
      />
      <div className={style.listContainer}>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
