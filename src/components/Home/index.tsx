import { Link } from 'react-router-dom';
import { Button } from '..';
import { useUserContext } from '@/contexts/UserContext';
import style from './style.module.scss';

export function Home() {
  const { user } = useUserContext();

  return (
    <div className={style.homeContainer}>
      {user ? (
        <>
          <h2>Welcome {user.username}!</h2>
          <p>
            Feel free to update your <Link to="/portfolio">portfolio</Link> with
            new projects or <Link to="/posts/new">write</Link> a new blog post
            to share with the world!
          </p>
        </>
      ) : (
        <h2>Welcome to Blogfolio!</h2>
      )}
      <p>
        Here at Blogfolio, it&apos;s all about sharing who you are with others.
        Be it through your words or your work, anyone who opens your page will
        be able to get a feel for what makes you, you!
      </p>
      <p>
        We&apos;re happy to have you here and we hope you meet others who share
        your dreams, goals and aspirations!
      </p>

      <Link to="/posts/new">
        <Button text="WRITE" />
      </Link>
    </div>
  );
}
