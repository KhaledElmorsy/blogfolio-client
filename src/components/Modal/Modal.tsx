import { createPortal } from 'react-dom';
import style from './Modal.module.scss';
import { MouseEvent } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ show, onClose, children }: ModalProps) {

  function closeModalClick(e: MouseEvent) {
    if (e.currentTarget !== e.target) return;
    onClose();
  }

  return !show
    ? null
    : createPortal(
        <div className={style.background} onClick={closeModalClick}>
          <div className={style.modalContainer}>{children}</div>
        </div>,
        document.body
      );
}
