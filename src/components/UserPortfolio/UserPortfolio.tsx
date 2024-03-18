import { PortfolioProject } from '../PortfolioProject/PortfolioProject';
import { getUserProjects } from '@/services/api/projects';
import { searchUsername } from '@/services/api/users';
import { SuccessCode } from '@blogfolio/types/Response';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Project } from '@blogfolio/types/Project';
import style from './UserPortfolio.module.scss';
import { Spinner } from '../Spinner/Spinner';

export function UserPortfolio() {
  const { username } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function getPortfolio() {
      const userResponse = await searchUsername(username!);
      if (userResponse.status !== SuccessCode.Ok) {
        throw 'Something wrong happened whi;e fetching the user ID';
      }
      const userID = userResponse.body.users.find(
        (u) => u.username === username
      )?.id;

      if (!userID) throw 'Couldnt find user ID';

      const projectResponse = await getUserProjects(userID);
      if (projectResponse.status === SuccessCode.Ok) {
        setProjects(projectResponse.body);
      }
    }

    getPortfolio().catch(console.error);
  }, [username]);

  return !projects ? (
    <Spinner />
  ) : (
    <div className={style.container}>
      {projects.map((p) => (
        <PortfolioProject key={p.projectID} project={p} />
      ))}
    </div>
  );
}
