import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import style from './Logout.module.scss';

export function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  logout()
    .then(() => navigate('/'))
    .catch((err) => {
      console.error(err);
      navigate('/');
    });
  return <div className={style.logoutMessage}>Logging out</div>;
}
