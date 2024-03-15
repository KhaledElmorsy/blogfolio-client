import { ChangeEventHandler } from 'react';
import style from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={style.container}>
      <input value={value} onChange={onChange} className={style.input} />
      <span className={style.magnifier}>🔍</span>
    </div>
  );
}
