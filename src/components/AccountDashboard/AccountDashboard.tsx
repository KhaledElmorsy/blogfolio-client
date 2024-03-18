import style from './AccountDashboard.module.scss';
import {
  username as zUsername,
  password as zPassword,
  Misc as zMisc,
} from '@blogfolio/types/User';
import {
  changeUsername,
  changePassword,
  updateUserData,
  checkUsername,
} from '@/services/api/users';
import { RefinedInput } from '../RefinedInput/RefinedInput';
import { useRefinedState } from '@/hooks';
import { useUserContext } from '@/contexts/UserContext';
import { useState, useEffect } from 'react';
import { ToastContainer, Slide, toast } from 'react-toastify';
import { SuccessCode } from '@blogfolio/types/Response';
import { Button } from '../Button/Button';

export function AccountDashboard() {
  const { user, refreshUserData } = useUserContext();

  const [username, setUsername, usernameErr] = useRefinedState(zUsername, '');
  const [password, setPassword, passwordErr] = useRefinedState(zPassword, '');
  const [bio, setBio, bioErr] = useRefinedState(zMisc.shape.bio, null);
  const [firstName, setFirstName, firstNameErr] = useRefinedState(
    zMisc.shape.firstName,
    null
  );
  const [lastName, setLastName, lastNameErr] = useRefinedState(
    zMisc.shape.lastName,
    null
  );
  const [usernameTaken, setUsernameTaken] = useState(false);

  useEffect(() => {
    if (bio === '') setBio(null);
  }, [bio, setBio]);

  useEffect(() => {
    if (firstName === '') setFirstName(null);
  }, [firstName, setFirstName]);

  useEffect(() => {
    if (lastName === '') setLastName(null);
  }, [lastName, setLastName]);

  useEffect(() => {
    if (username === user?.username) setUsernameTaken(false);
    checkUsername(username)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setUsernameTaken(res.body.result);
        }
      })
      .catch(console.error);
  }, [username, user?.username]);

  useEffect(() => {
    if (!user) return;
    setBio(user.bio!);
    setFirstName(user.firstName!);
    setLastName(user.lastName!);
  }, [user, setBio, setFirstName, setLastName]);

  const toatSettings = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
    transition: Slide,
  } as const;

  function handleChangePassword() {
    changePassword(password)
      .then((res) => {
        if (res.status !== SuccessCode.Ok) {
          res.body.errors.map((err) => toast.error(err.message, toatSettings));
        } else {
          toast.success('Password successfully changed', toatSettings);
        }
      })
      .catch(console.error);
  }

  function handleChangeUsername() {
    changeUsername(username)
      .then((res) => {
        if (res.status !== SuccessCode.Ok) {
          res.body.errors.map((err) => toast.error(err.message, toatSettings));
        } else {
          toast.success('Username successfully changed', toatSettings);
          refreshUserData();
        }
      })
      .catch(console.error);
  }

  function handleSaveMisc() {
    updateUserData({ bio, firstName, lastName })
      .then((res) => {
        if (res.status !== SuccessCode.Ok) {
          res.body.errors.map((err) => toast.error(err.message, toatSettings));
        } else {
          toast.success('Data updated', toatSettings);
          refreshUserData();
        }
      })
      .catch(console.error);
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.credentialsContainer}>
          <h3>Account Dashboard</h3>
          <div>
            <RefinedInput
              placeholder="Username"
              label="Username"
              value={username}
              errors={usernameErr}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              text="Change"
              className={style.button}
              disabled={
                !!usernameErr.length ||
                usernameTaken ||
                username === user?.username
              }
              onClick={handleChangeUsername}
            />
          </div>
          <div>
            <RefinedInput
              password
              value={password}
              label="Password"
              errors={passwordErr}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              text="Change"
              className={style.button}
              disabled={!!passwordErr.length}
              onClick={handleChangePassword}
            />
          </div>
        </div>
        <div className={style.miscContainer}>
          <RefinedInput
            value={bio ?? ''}
            label="Bio"
            errors={bioErr}
            onChange={(e) => setBio(e.target.value)}
          />
          <RefinedInput
            value={firstName ?? ''}
            label="First Name"
            errors={firstNameErr}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <RefinedInput
            value={lastName ?? ''}
            label="Last Name"
            errors={lastNameErr}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button
            text="Save changes"
            className={style.button}
            onClick={handleSaveMisc}
            disabled={
              !!lastNameErr.length || !!firstNameErr.length || !!bioErr.length
            }
          />
        </div>
      </div>
      <ToastContainer limit={2} />
    </>
  );
}
