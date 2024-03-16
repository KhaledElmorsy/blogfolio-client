import type {
  EmoteCount as EmoteCountType,
  LightPost,
} from '../PostList/PostList';
import { useEffect, useState } from 'react';
import { getUserData } from '@/services/api/users';
import { SuccessCode } from '@blogfolio/types/Response';
import { Resources } from '@blogfolio/types/User';
import style from './PostListItem.module.scss';
import { Spinner } from '../Spinner/Spinner';
import { EmoteCount } from '../EmoteCount/EmoteCount';
import { Link } from 'react-router-dom';

type User = Resources['QueriedUser'];

interface PostListItemProps extends LightPost {
  emotes: EmoteCountType[];
}

export function PostListItem({
  title,
  summary,
  userID,
  emotes,
  createdAt,
  slug,
}: PostListItemProps) {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function updateUserData() {
      const response = await getUserData(userID);
      if (response.status !== SuccessCode.Ok) {
        throw new Error("Something went wrong getting a post author's data.");
      }
      setUser(response.body.user);
    }

    updateUserData().catch(console.error);
  }, []);

  const createdAtDate = new Date(createdAt);
  const renderedDate = `${createdAtDate.getMonth()}/${createdAtDate.getFullYear()}`;

  const linkURL = `/users/${user?.username}/posts/${slug}`;

  return !user ? (
    <Spinner />
  ) : (
    <div className={style.itemContainer}>
      <div className={style.userData}>
        <img className={style.userPFP} src={user?.photoSmall ?? ''} />
        <p className={style.username}>{user.username}</p>
      </div>
      <div className={style.postData}>
        <Link to={linkURL}>
          <h4 className={style.title}>{title}</h4>
        </Link>
        <p className={style.summary}>{summary ?? ''}</p>
        <div className={style.miscContainer}>
          <p className={style.date}>{renderedDate}</p>
          <div className={style.emotes}>
            <EmoteCount emoteCounts={emotes} />
          </div>
        </div>
      </div>
    </div>
  );
}
