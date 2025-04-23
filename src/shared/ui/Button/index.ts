import { Block } from '@/shared/services';
import { clsx } from '@/shared/utils';
import styles from './Button.module.scss';

interface ButtonProps extends Omit<Partial<HTMLButtonElement>, 'children' | 'className'> {
  className?: string;
  children?: string | Block;
  variant?: 'primary' | 'secondary' | 'alert' | 'success' | 'clean';
  htmlType?: HTMLButtonElement['type'];
  onClick?: (e: MouseEvent) => void;
}

export class Button extends Block<ButtonProps> {
  constructor({ onClick, id = '', variant = 'primary', type = 'button', ...props }: ButtonProps) {
    super({
      variant,
      events: {
        click: onClick,
      },
      id,
      type,
      ...props,
    });
  }

  render() {
    const { className, variant } = this.getProps();

    return `
      <button 
        type="{{ type }}"
        class='${clsx(styles.button, styles[variant], className)}'
        ${this.props.id ? `id={{ id }} ` : ''}
        ${this.props.disabled ? 'disabled' : ''}
      >
        {{{children}}}
      </button>
    `;
  }
}
