import { useRef, type ChangeEventHandler } from 'react';
import style from './style.module.scss';
import { useHover } from 'usehooks-ts';

interface RefinedInputProps {
  errors: Array<string>;
  value: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export function RefinedInput({
  value,
  onChange,
  disabled,
  required,
  placeholder,
  errors,
}: RefinedInputProps) {
  const errorClass = errors.length ? style.error : '';
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHovered = useHover(inputRef);
  return (
    <>
      <div className={style.inputContainer}>
        <input
          ref={inputRef}
          disabled={disabled ?? false}
          required={required ?? false}
          onChange={onChange}
          value={value}
          className={`${style.input} ${errorClass}`}
          placeholder={placeholder}
        />{' '}
        {!inputHovered || !errors.length ? null : (
          <ul className={style.errorList}>
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
