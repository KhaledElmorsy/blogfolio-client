import { Resources } from '@blogfolio/types/User';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

const LOCAL_STORAGE_KEY = 'user';

type LoggedUser = Resources['QueriedUser'] | null;

interface UserContextProviderType {
  user: LoggedUser;
  setUser: Dispatch<SetStateAction<LoggedUser>>;
}

export const UserContext = createContext<UserContextProviderType | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useLocalStorage<LoggedUser | null>(
    LOCAL_STORAGE_KEY,
    null
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('User context consumed outside the provider');
  }

  return userContext;
}
