import { nameSchema } from '@blogfolio/types/Project';
import { RefinedInput } from '../RefinedInput/RefinedInput';
import {
  createProject,
  editProject,
  getProject,
} from '@/services/api/projects';
import { useEffect, useState } from 'react';
import { useRefinedState } from '@/hooks';
import { SuccessCode } from '@blogfolio/types/Response';
import { TagBox } from '../TagBox/TagBox';
import { Button } from '../Button/Button';
import MDEditor from '@uiw/react-md-editor';
import style from './ProjectForm.module.scss';

interface ProjectFormProps {
  projectID?: string;
  onSave?: () => void;
  priority: number;
}

export function ProjectForm({
  projectID,
  priority,
  onSave,
}: ProjectFormProps) {
  const [name, setName, nameErr] = useRefinedState(nameSchema, '');
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (!projectID) return;
    getProject(projectID)
      .then((res) => {
        if (res.status === SuccessCode.Ok) {
          const project = res.body;
          setName(project.name);
          setDescription(project.description);
          setSkills(project.skills);
        }
      })
      .catch(console.error);
  }, [projectID, setDescription, setName, setSkills]);

  async function updateCreate() {
    if (projectID) {
      await editProject(projectID, { description, name, skills });
    } else {
      await createProject({ description, name, skills, priority });
    }
    onSave && onSave();
  }

  return (
    <div className={style.container}>
      <RefinedInput
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        errors={nameErr}
      />
      <MDEditor value={description} onChange={setDescription} />
      <TagBox tags={skills} setTags={setSkills} />
      <Button
        className={style.button}
        text="Save"
        onClick={() => void updateCreate()}
        disabled={!!nameErr.length}
      />
    </div>
  );
}
