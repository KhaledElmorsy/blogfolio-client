import { getLoggedUser } from '@/services/api/users';
import { SuccessCode } from '@blogfolio/types/Response';
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
  refreshUserData: () => void;
}

export const UserContext = createContext<UserContextProviderType | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useLocalStorage<LoggedUser | null>(
    LOCAL_STORAGE_KEY,
    null
  );

  function refreshUserData() {
    if (!user) return;
    getLoggedUser().then(res => {
      if (res.status === SuccessCode.Ok) {
        setUser(res.body.user)
      }
    }).catch(console.error)
  }

  return (
    <UserContext.Provider value={{ user, setUser, refreshUserData }}>
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
