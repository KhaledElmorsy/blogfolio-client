import { Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';
import style from './TagBox.module.scss';

interface TagBoxProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export function TagBox({ tags, setTags }: TagBoxProps) {
  const [currentTag, setCurrentTag] = useState('');

  function clickTagRemove(index: number) {
    return function () {
      setTags((prev) => {
        const next = prev.slice();
        next.splice(index, 1);
        return next;
      });
    };
  }
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const { key } = e;
    if (key === 'Enter') {
      setTags((prev) => [...prev, currentTag]);
      setCurrentTag('');
    }
    if (key === 'Backspace' && currentTag === '') {
      setTags((prev) => prev.slice(0, -1));
    }
  }
  return (
    <div className={style.container}>
      <div className={style.tags}>
        {tags.map((tag, i) => (
          <span className={style.tag} key={i} onClick={clickTagRemove(i)}>
            {tag}
          </span>
        ))}
      </div>
      <input
        className={style.input}
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags..."
      />
    </div>
  );
}
