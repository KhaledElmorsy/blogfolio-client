import { checkUsername } from '@/services/api/users';
import { SuccessCode } from '@blogfolio/types/Response';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import style from './UserLayout.module.scss';

export function UserLayout() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const response = await checkUsername(username!);
      if (response.status !== SuccessCode.Ok) {
        throw 'Something went wrong';
      }
      setUserExists(response.body.result);
      setLoading(false);
    }
    checkUser().catch(() => navigate('/error'));
  }, [username, navigate]);

  function activeTabStyle({ isActive }: { isActive: boolean }) {
    return isActive ? style.active : '';
  }

  return loading ? (
    <Spinner size={100} />
  ) : !userExists ? (
    <div className={style.doesntExistMessage}>
      @{username} doesn&apos;t seem to exist!
    </div>
  ) : (
    <div className={style.page}>
      <div className={style.miniBlock}>
        <div className={style.tabs}>
          <NavLink to="posts" className={activeTabStyle}>
            Posts
          </NavLink>
          <NavLink to="portfolio" className={activeTabStyle}>
            Portfolio
          </NavLink>
        </div>
        <p className={style.username}>@{username}</p>
      </div>
      <Outlet />
    </div>
  );
}
