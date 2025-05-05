import { Block, router } from '@/shared/services';

import styles from './Link.module.scss';
import { clsx } from '@/shared/utils';

interface LinkProps {
  children?: Block | string;
  className?: string;
  to?: string;
  onClick?: (e: MouseEvent) => void;
}

export class Link extends Block {
  constructor({ onClick, ...props }: LinkProps) {
    super({
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          onClick?.(e);
          router.goByPathname(this.props.to);
        },
      },
      ...props,
    });
  }

  render() {
    return `
      <a 
        class='${clsx(styles.link, this.props.className)}'
        href={{href}}
        ${this.props.to ? 'href="{{to}}"' : ''}
      >
        {{{children}}}
      </a>
    `;
  }
}
