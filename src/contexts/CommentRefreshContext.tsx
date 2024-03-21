import { ReactNode, createContext, useContext, useState } from 'react';

interface RefreshContext {
  refresh: () => void;
  watchRefresh: boolean;
}

const RefreshContext = createContext<RefreshContext | null>(null);

interface CommentRefreshProps {
  children: ReactNode;
}

export function CommentRefreshProvider({ children }: CommentRefreshProps) {
  const [watchRefresh, setWatchRefresh] = useState(false);

  function refresh() {
    setWatchRefresh((p) => !p);
  }

  return (
    <RefreshContext.Provider value={{ refresh, watchRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useCommentRefresh() {
  const context = useContext(RefreshContext);

  if (!context) {
    throw new Error('Comment refresh context used outside of its provider');
  }

  return context;
}
