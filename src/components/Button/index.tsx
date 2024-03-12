import style from './style.module.scss';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  disabled?: boolean;
  danger?: boolean;
  href?: string;
}

export function Button({ onClick, text, disabled, danger, href }: ButtonProps) {
  const buttonClass = `${style.button} ${danger ? style.danger : ''}`;
  return href ? (
    <a href={href} className={buttonClass}>
      {text}
    </a>
  ) : (
    <button disabled={disabled} onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
}
