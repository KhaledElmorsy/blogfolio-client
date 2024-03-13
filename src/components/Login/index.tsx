import { Button, RefinedInput } from '..';
import { useAuth, useRefinedState } from '@/hooks/';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  username as usernameSchema,
  password as passwordSchema,
} from '@blogfolio/types/User';
import { useUserContext } from '@/contexts/UserContext';
import { ToastContainer, toast, Slide } from 'react-toastify';
import style from './style.module.scss';

export function Login() {
  const { user } = useUserContext();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername, usernameErrs] = useRefinedState(
    usernameSchema,
    ''
  );
  const [password, setPassword, passwordErrs] = useRefinedState(
    passwordSchema,
    ''
  );

  function performLogin() {
    login(username, password)
      .then(() => {
       navigate('/');
      })
      .catch((err) => {
        toast.error(err as string, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
      });
  }

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className={style.loginContainer}>
      <span className={style.title}>Login</span>
      <div className={style.inputContainer}>
        <div className={style.label}>Username</div>
        <RefinedInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          errors={usernameErrs}
        />
      </div>
      <div className={style.inputContainer}>
        <div className={style.label}>Password</div>
        <RefinedInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errors={passwordErrs}
          password
        />
      </div>
      <Button
        disabled={!!passwordErrs.length || !!usernameErrs.length}
        text="Login"
        onClick={performLogin}
      />
      <ToastContainer limit={1} />
    </div>
  );
}
