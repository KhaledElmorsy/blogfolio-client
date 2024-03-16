import { useEmoteContext } from '@/contexts/EmoteContext';
import style from './EmotePicker.module.scss';
import { EmoteCount } from '../PostList/PostList';

interface EmotePickerProps {
  pickedEmote: number | null;
  onPick: (emoteID: number) => void | Promise<void>;
  size?: 'large' | 'small';
  emoteCounts: EmoteCount[];
}

export function EmotePicker({
  pickedEmote,
  onPick,
  size = 'large',
  emoteCounts,
}: EmotePickerProps) {
  const emotes = useEmoteContext();

  function pickEmote(emoteID: number) {
    return function () {
      void onPick(emoteID);
    };
  }

  const sizeClass = size === 'large' ? style.large : style.small;

  return (
    <div className={`${style.container} ${sizeClass}`}>
      {Object.entries(emotes).map(([id, emote]) => {
        const numID = parseInt(id, 10);
        const emoteCount =
          emoteCounts.find(({ emoteID }) => numID === emoteID)?.count ?? 0;
        const pickedClass = pickedEmote === numID ? style.picked : ''
        return (
          <div
            key={id}
            className={`${style.emote} ${pickedClass}`}
            onClick={pickEmote(numID)}
          >
            {emote} {emoteCount}
          </div>
        );
      })}
    </div>
  );
}
