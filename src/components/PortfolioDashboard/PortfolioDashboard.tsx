import {
  getUserProjects,
  deleteProject,
} from '@/services/api/projects';
import { useUserContext } from '@/contexts/UserContext';
import { ProjectForm } from '../ProjectForm/ProjectForm';
import { PortfolioProject } from '../PortfolioProject/PortfolioProject';
import { useState, useEffect } from 'react';
import type { Project } from '@blogfolio/types/Project';
import style from './PortfolioDashboard.module.scss';
import { SuccessCode } from '@blogfolio/types/Response';

export function PortfolioDashboard() {
  const { user } = useUserContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (!user) return;
    getUserProjects(user.id)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          setProjects(res.body);
        }
      })
      .catch(console.error);
  }, [user, refetch]);

  function handleSave() {
    setRefetch((p) => !p);
  }

  function deleteProjectHandler(projectID: string) {
    return function () {
      deleteProject(projectID)
        .then((res) => {
          if (res.status === SuccessCode.Ok) {
            setRefetch((p) => !p);
          }
        })
        .catch(console.error);
    };
  }

  const sortedProjects = projects.sort((a, b) => a.priority - b.priority);
  const maxPriority = sortedProjects.at(-1)?.priority ?? 0;

  return (
    <div className={style.container}>
      <div className={style.projectsContainer}>
        {sortedProjects.map((p) => (
          <div key={p.projectID} className={style.project}>
            <PortfolioProject project={p} />
            <span
              className={style.deleteButton}
              onClick={deleteProjectHandler(p.projectID)}
            >x</span>
          </div>
        ))}
      </div>
      <div className={style.formContainer}>
        <ProjectForm priority={maxPriority + 1} onSave={handleSave} />
      </div>
    </div>
  );
}
