import { ChangeEventHandler } from 'react';
import style from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className={style.container}>
      <input
        value={value}
        onChange={onChange}
        className={style.input}
        placeholder={placeholder}
      />
      <span className={style.magnifier}>🔍</span>
    </div>
  );
}
