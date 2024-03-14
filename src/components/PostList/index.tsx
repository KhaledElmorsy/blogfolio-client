import { getPostEmoteCounts } from '@/services/api/emotes';
import { Post as PostTypes } from '@blogfolio/types';
import { SuccessCode } from '@blogfolio/types/Response';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { PostListItem } from '../PostListItem';

export type Post = z.infer<(typeof PostTypes)['postSchema']>;

export type LightPost = Omit<Post, 'body' | 'visible'>;

export type EmoteCount = { emoteID: number; count: number };

interface PostListProps {
  posts: LightPost[];
}

export function PostList({ posts }: PostListProps) {
  const [emoteCounts, setEmoteCounts] = useState<Record<string, EmoteCount[]>>(
    {}
  );

  useEffect(() => {
    async function updateEmoteCounts() {
      const postIDs = posts.map(({ id }) => id);
      const response = await getPostEmoteCounts(postIDs);
      if (response.status !== SuccessCode.Ok) {
        throw 'Something went wrong getting post emote counts';
      }
      setEmoteCounts(response.body);
    }

    updateEmoteCounts().catch(console.error);
  }, [posts]);

  return posts.map((post) => (
    <PostListItem {...post} key={post.id} emotes={emoteCounts[post.id] ?? []} />
  ));
}
