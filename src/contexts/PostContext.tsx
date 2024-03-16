import { ReactNode, createContext, useContext } from "react";

interface PostContextType {
  postID: string;
}

const PostContext = createContext<PostContextType | null>(null);

interface PostProviderProps {
  children: ReactNode;
  postID: string;
}

export function PostProvider ({children, postID}: PostProviderProps) {
  return <PostContext.Provider value={{postID}}>
    {children}
  </PostContext.Provider>
} 

export function usePostContext() {
  const postContext = useContext(PostContext);

  if(postContext === null) {
    throw new Error('Post context used outside provider')
  }

  return postContext;
}
