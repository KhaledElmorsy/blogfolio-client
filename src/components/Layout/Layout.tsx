import { Link, Outlet } from 'react-router-dom';
import style from './Layout.module.scss';
import { useUserContext } from '@/contexts/UserContext';

export function Layout() {
  const { user } = useUserContext();

  return (
    <div className={style.pageContainer}>
      <div className={style.topBar}>
        <Link to="/" className={style.logo}>
          Blogfolio
        </Link>
        <div className={style.navBar}>
          <span className={style.links}>
            <Link to="/">Home</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/account">Account</Link>
          </span>
          <span className={style.userActions}>
            {!user ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            ) : (
              <>
                <img src={user.photoSmall ?? ''} className={style.userPic} />
                <Link to="/logout">Logout</Link>
              </>
            )}
          </span>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
