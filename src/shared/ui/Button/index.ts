import { Block } from '@/shared/services';
import { clsx } from '@/shared/utils';

interface ButtonProps extends Omit<Partial<HTMLButtonElement>, 'children' | 'className'> {
  className?: string;
  children?: string;
  htmlType?: HTMLButtonElement['type'];
  onClick?: (e: MouseEvent) => void;
}

export class Button extends Block {
  constructor({ onClick, id = '', ...otherProps }: ButtonProps) {
    super({
      events: {
        click: onClick,
      },
      id,
      ...otherProps,
    });
  }

  render() {
    const className = this.getProp('className');
    const resultClassName = clsx('btn', className);

    return `
      <button 
        id={{id}} 
        type={{htmlType}} 
        class='${resultClassName}'>
        {{children}}
      </button>
    `;
  }
}
