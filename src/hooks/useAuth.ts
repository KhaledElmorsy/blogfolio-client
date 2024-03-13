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
  const [loginError, setLoginError] = useState<string | null>();

  async function login(username: string, password: string) {
    const loginResponse = await loginApi(username, password);
    let loginErr;
    switch (loginResponse.status) {
      case SuccessCode.Ok: {
        setLoginError(null);
        const loggedUserResponse = await getLoggedUser();
        if (loggedUserResponse.status === SuccessCode.Ok) {
          return setUser(loggedUserResponse.body.user);
        } else {
          loginErr = 'Something went wrong';
        }
        break;
      }
      case ErrorCode.Forbidden:
        loginErr = 'Your credentials are incorrect';
        break;
      case ErrorCode.NotFound:
        loginErr = "A user with that username doesn't exist";
        break;
      case ErrorCode.BadRequest:
        loginErr = 'Ensure your credentials are valid';
        break;
      default:
        loginErr = 'Something went wrong';
    }
    setLoginError(loginErr);
    throw loginErr;
  }

  async function logout() {
    const response = await logoutApi();
    if (response.status === SuccessCode.Ok) {
      setUser(null);
    }
  }
  return { logout, login, loginError };
}
