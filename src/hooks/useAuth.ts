import { useUserContext } from '@/contexts/UserContext';
import {
  login as loginApi,
  logout as logoutApi,
} from '@/services/api/authentication';
import { getLoggedUser } from '@/services/api/users';
import { ErrorCode, SuccessCode } from '@blogfolio/types/Response';
import { useState } from 'react';

export function useAuth() {
  const { setUser } = useUserContext();
  const [loginError, setLoginError] = useState<string>('');

  async function login(username: string, password: string) {
    const loginResponse = await loginApi(username, password);
    switch (loginResponse.status) {
      case SuccessCode.Ok: {
        setLoginError('');
        const loggedUserResponse = await getLoggedUser();
        if (loggedUserResponse.status === SuccessCode.Ok) {
          setUser(loggedUserResponse.body.user);
        } else {
          setLoginError('Something went wrong');
        }
        break;
      }
      case ErrorCode.Forbidden:
        setLoginError('Your credentials are incorrect');
        break;
      case ErrorCode.NotFound:
        setLoginError("A user with that username doesn't exist");
        break;
      case ErrorCode.BadRequest:
        setLoginError('Ensure your credentials are valid');
        break;
      default:
        setLoginError('Something went wrong');
    }
  }

  async function logout() {
    const response = await logoutApi();
    if (response.status === SuccessCode.Ok) {
      setUser(null);
    }
  }
  return { logout, login, loginError };
}
