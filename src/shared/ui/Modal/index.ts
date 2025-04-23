import { Block } from '@/shared/services';

import styles from './Modal.module.scss';
import { clsx } from '@/shared/utils';
import { Button } from '../Button';
import { Icon } from '../Icon';

import closeIcon from '@/shared/assets/icons/close.svg';

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
      CloseButton: new Button({
        variant: 'clean',
        className: styles.closeButton,
        children: new Icon({ src: closeIcon }),
        onClick: e => {
          e.preventDefault();
          this._closeModal();
          onClose?.();
        },
      }),
      ...props,
    });
  }

  private _closeModal() {
    this.setProps({ isOpen: false });
    this.props.onClose?.();
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this._closeModal();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  componentDidUpdate(oldProps: ModalProps, newProps: ModalProps) {
    if (oldProps.isOpen !== newProps.isOpen) {
      if (newProps.isOpen) {
        document.addEventListener('keydown', this._handleKeyDown);
      } else {
        document.removeEventListener('keydown', this._handleKeyDown);
      }
    }

    return true;
  }

  render() {
    const isOpen = this.getPropValue('isOpen');
    const className = this.getPropValue('className');

    return `
      <div class='${clsx(styles.modal, { [styles.open]: isOpen })}'>
        <div class=${styles.modalOverlay} />
        <div class='${clsx(styles.modalWrapper, className)}' >
          <div class=${styles.modalContent}>
           {{{children}}}
           {{{CloseButton}}}
          </div>
        </div>
      </div>
    `;
  }
}
