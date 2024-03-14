import { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { getCurrentEmotes } from '@/services/api/emotes';
import { SuccessCode } from '@blogfolio/types/Response';

const EMOTE_STORAGE_KEY = 'emotes';

type Emotes = Record<number, string>;

export const EmoteContext = createContext<Emotes | null>(null);

export function EmoteProvider({ children }: PropsWithChildren) {
  const [emotes, setEmotes] = useLocalStorage<Emotes>(EMOTE_STORAGE_KEY, {});

  useEffect(() => {
    async function getEmotes() {
      const response = await getCurrentEmotes();
      if (response.status !== SuccessCode.Ok) {
        throw new Error('Something went wrong while getting emotes');
      }
      const emoteArray = response.body;
      setEmotes(
        emoteArray.reduce(
          (acc, emote) => ({ ...acc, [emote.id]: emote.body }),
          {}
        )
      );
    }
    
    if (!Object.keys(emotes).length) {
      getEmotes().catch(console.error);
    }
  }, []);

  return (
    <EmoteContext.Provider value={emotes}>{children}</EmoteContext.Provider>
  );
}

export function useEmoteContext() {
  const emotes = useContext(EmoteContext);
  if (!emotes) {
    throw new Error('Emote context consumed outside provider');
  }
  return emotes;
}
