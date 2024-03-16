import style from './Button.module.scss';
import { MouseEventHandler } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  disabled?: boolean;
  danger?: boolean;
  href?: string;
  className?: string;
}

export function Button({
  onClick,
  text,
  disabled,
  danger,
  href,
  className = '',
}: ButtonProps) {
  const buttonClass = `${style.button} ${
    danger ? style.danger : ''
  } ${className}`;
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
