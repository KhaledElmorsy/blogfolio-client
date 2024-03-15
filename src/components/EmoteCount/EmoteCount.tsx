import { useEmoteContext } from '@/contexts/EmoteContext';
import type { EmoteCount } from '../PostList/PostList';
import style from './EmoteCount.module.scss';

interface EmoteCountProps {
  emoteCounts: EmoteCount[];
}

export function EmoteCount({ emoteCounts }: EmoteCountProps) {
  const emoteMap = useEmoteContext();

  return (
    <div className={style.emoteContainer}>
      {!emoteCounts.length
        ? null
        : emoteCounts
            .sort((a, b) => a.emoteID - b.emoteID)
            .map((emote) => (
              <span key={emote.emoteID}>
                {emoteMap[emote.emoteID]} {emote.count}
              </span>
            ))}
    </div>
  );
}
