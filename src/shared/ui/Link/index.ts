import { Block } from '@/shared/services';

interface LinkProps {
  children?: Block;
  href?: string;
  onClick?: (e: MouseEvent) => void;
}

export class Link extends Block {
  constructor({ onClick, href, ...props }: LinkProps) {
    super({
      events: {
        click: (e: MouseEvent) => {
          e.preventDefault();
          window.history.pushState({}, '', href);
          onClick?.(e);
        },
      },
      ...props,
    });
  }

  render() {
    return `
      <a href={{href}}>
        {{{children}}}
      </a>
    `;
  }
}
