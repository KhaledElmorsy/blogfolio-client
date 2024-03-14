import { BounceLoader } from 'react-spinners';
import style from './style.module.scss';

interface SpinnerProps {
  /** When number, unit is assumed as px. When string, a unit is expected to be passed in */
  size?: number | string;
}

export function Spinner({ size = 40 }: SpinnerProps) {
  return <BounceLoader size={size} color={style.mainColor} />;
}
