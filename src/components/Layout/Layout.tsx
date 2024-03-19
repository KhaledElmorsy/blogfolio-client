import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import style from './Layout.module.scss';
import './Layout.scss';
import { useUserContext } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export function Layout() {
  const { user } = useUserContext();

  const [showNavbar, setShowNavbar] = useState(true);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const location = useLocation();

  useEffect(() => {
    if (isMobile) setShowNavbar(false);
  }, [location]);

  useEffect(() => {
    setShowNavbar(!isMobile);
  }, [isMobile]);

  return (
    <div className={style.pageContainer}>
      <div className={style.topBar}>
        <Link to="/" className={style.logo}>
          Blogfolio
        </Link>
        <div className={style.burger} onClick={() => setShowNavbar((p) => !p)}>
          ≡
        </div>
        {!showNavbar ? null : (
          <div className={style.navBar}>
            <span className={style.links}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/posts">Posts</NavLink>
              <NavLink to="/account">Account</NavLink>
            </span>
            <span className={style.userActions}>
              {!user ? (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/signup">Signup</NavLink>
                </>
              ) : (
                <>
                  <img src={user.photoSmall ?? ''} className={style.userPic} />
                  <Link to="/logout">Logout</Link>
                </>
              )}
            </span>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
