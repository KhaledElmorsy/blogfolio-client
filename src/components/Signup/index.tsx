import { RefinedInput, Button } from '..';
import {
  ChangeEventHandler,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from 'react';
import {
  username as zUsername,
  password as zPassword,
  email as zEmail,
  Misc,
} from '@blogfolio/types/User';
import { useUserContext } from '@/contexts/UserContext';
import { checkUsername, checkEmail, signUp } from '@/services/api/users';
import { useNavigate, Navigate } from 'react-router-dom';
import { useRefinedState, useAuth } from '@/hooks';
import { SuccessCode } from '@blogfolio/types/Response';
import { ToastContainer, toast, Slide } from 'react-toastify';
import style from './style.module.scss';

export function Signup() {
  const { user } = useUserContext();

  const { bio: zBio, firstName: zFirstName, lastName: zLastName } = Misc.shape;
  const [username, setUsername, usernameErr] = useRefinedState(zUsername, '');
  const [email, setEmail, emailErr] = useRefinedState(zEmail, '');
  const [password, setPassword, passwordErr] = useRefinedState(zPassword, '');
  const [bio, setBio, bioErr] = useRefinedState(zBio, null as string | null);
  const [firstName, setFirstName, firstNameErr] = useRefinedState(
    zFirstName,
    null as string | null
  );
  const [lastName, setLastName, lastNameErr] = useRefinedState(
    zLastName,
    null as string | null
  );

  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const allValid =
    !bioErr.length &&
    !firstNameErr.length &&
    !lastNameErr.length &&
    !emailErr.length &&
    !passwordErr.length &&
    !usernameErr.length &&
    !usernameTaken &&
    !emailTaken;

  // Don't set optional (nullable) fields to blank strings to avoid parsing errors
  // AKA "Bio cant be set to a blank string", from the schema.

  useEffect(() => {
    if (bio === '') setBio(null);
  }, [bio, setBio]);

  useEffect(() => {
    if (firstName === '') setFirstName(null);
  }, [firstName, setFirstName]);

  useEffect(() => {
    if (lastName === '') setLastName(null);
  }, [lastName, setLastName]);

  function update(
    setter:
      | Dispatch<SetStateAction<string | null>>
      | Dispatch<SetStateAction<string>>
  ): ChangeEventHandler<HTMLInputElement> {
    return (e) => setter(e.target.value);
  }

  useEffect(() => {
    checkUsername(username)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setUsernameTaken(res.body.result);
        }
      })
      .catch(console.error);
  }, [username]);

  useEffect(() => {
    checkEmail(email)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setEmailTaken(res.body.result);
        }
      })
      .catch(console.error);
  }, [email]);

  const navigate = useNavigate();
  const { login } = useAuth();

  function completeSignUp() {
    signUp({
      username,
      password,
      email,
      bio,
      firstName,
      lastName,
    })
      .then((res) => {
        if (res.status === SuccessCode.Created) {
          login(username, password)
            .then(() => {
              navigate('/');
            })
            .catch(console.error);
        } else {
          console.log(res.body.errors);
          res.body.errors.forEach((error) => {
            toast.error(error.message, {
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
      })
      .catch(console.error);
  }

  return user ? (
    <Navigate to="/" />
  ) : (
    <div className={style.signupContainer}>
      <span className={style.title}>Sign up for Blogfolio!</span>
      <div className={`${style.block} ${style.username}`}>
        <RefinedInput
          errors={usernameErr.concat(
            usernameTaken ? ['Username not available'] : []
          )}
          label="Username*"
          value={username}
          onChange={update(setUsername)}
        />
      </div>
      <div className={`${style.block} ${style.email}`}>
        <RefinedInput
          errors={emailErr.concat(emailTaken ? ['Email not available'] : [])}
          label="Email*"
          value={email}
          onChange={update(setEmail)}
        />
      </div>
      <div className={`${style.block} ${style.password}`}>
        <RefinedInput
          errors={passwordErr}
          label="Password*"
          value={password}
          onChange={update(setPassword)}
          password
        />
      </div>
      <div className={`${style.block} ${style.bio}`}>
        <RefinedInput
          errors={bioErr}
          label="Bio"
          value={bio ?? ''}
          onChange={update(setBio)}
        />
      </div>
      <div className={`${style.block} ${style.firstName}`}>
        <RefinedInput
          errors={firstNameErr}
          label="First Name"
          value={firstName ?? ''}
          onChange={update(setFirstName)}
        />
      </div>
      <div className={`${style.block} ${style.lastName}`}>
        <RefinedInput
          errors={lastNameErr}
          label="Last Name"
          value={lastName ?? ''}
          onChange={update(setLastName)}
        />
      </div>
      <Button disabled={!allValid} text="Sign up" onClick={completeSignUp} />
      <ToastContainer limit={4} />
    </div>
  );
}
