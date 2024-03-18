import { searchUsername } from '@/services/api/users';
import { SuccessCode } from '@blogfolio/types/Response';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import style from './UserLayout.module.scss';
import { Resources } from '@blogfolio/types/User';

export function UserLayout() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<Resources['QueriedUser']>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const response = await searchUsername(username!);
      if (response.status !== SuccessCode.Ok) {
        throw 'Something went wrong';
      }
      const userData = response.body.users.find((u) => u.username === username);
      setUser(userData);
      setLoading(false);
    }
    checkUser().catch(() => navigate('/error'));
  }, [username, navigate]);

  function activeTabStyle({ isActive }: { isActive: boolean }) {
    return isActive ? style.active : '';
  }

  return loading ? (
    <Spinner size={100} />
  ) : !user ? (
    <div className={style.doesntExistMessage}>
      @{username} doesn&apos;t seem to exist!
    </div>
  ) : (
    <div className={style.page}>
      <div className={style.miniBlock}>
        <p className={style.username}>@{username}</p>
        {!user.bio? null : <p className={style.bio}>{user.bio}</p>}
        <div className={style.tabs}>
          <NavLink to="posts" className={activeTabStyle}>
            Posts
          </NavLink>
          <NavLink to="portfolio" className={activeTabStyle}>
            Portfolio
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
