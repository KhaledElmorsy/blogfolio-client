import { type Project } from '@blogfolio/types/Project';
import MDEditor from '@uiw/react-md-editor';
import style from './PortfolioProject.module.scss';

interface PortfolioProjectProps {
  project: Project;
}

export function PortfolioProject({ project }: PortfolioProjectProps) {
  return (
    <div className={style.container}>
      <div className={style.name}>{project.name}</div>
      <MDEditor.Markdown
        className={style.description}
        source={project.description}
      />
      {!project.skills.length ? null : (
        <div className={style.tags}>
          {project.skills.map((skill, i) => (
            <span className={style.tag} key={i}>{skill}</span>
          ))}
        </div>
      )}
    </div>
  );
}
