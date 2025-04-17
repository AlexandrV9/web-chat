import { Block } from '@/shared/services';

import styles from './Modal.module.scss';
import { clsx } from '@/shared/utils';
import { Button } from '../Button';

export interface ModalProps {
  isOpen: boolean;
  children: Block;
  className?: string;
  onClose?: () => void;
}

export class Modal extends Block {
  constructor({ isOpen, onClose, ...props }: ModalProps) {
    super({
      isOpen,
      closeButton: new Button({
        className: styles.closeButton,
        children: 'Закрыть',
        onClick: e => {
          e.preventDefault();
          this.setProps({ isOpen: false });
          onClose?.();
        },
      }),
      ...props,
    });
  }

  render() {
    const isOpen = this.getProp('isOpen');
    const className = this.getProp('className');

    return `
      <div class='${clsx(styles.modal, { [styles.open]: isOpen })}'>
        <div class=${styles.modalOverlay} />
        <div class='${clsx(styles.modalWrapper, className)}' >
          <div class=${styles.modalContent}>
           {{{children}}}
           {{{closeButton}}}
          </div>
        </div>
      </div>
    `;
  }
}
