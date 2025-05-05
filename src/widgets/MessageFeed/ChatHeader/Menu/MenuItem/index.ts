import { Block } from '@/shared/services';

import { tmpl } from './MenuItem.tmpl';

export interface MenuItemProps {
  text: string;
  onClick?: () => void;
}

export class MenuItem extends Block {
  constructor({ text, onClick }: MenuItemProps) {
    super({
      chatTitle: '',
      text,
      events: {
        click: (e: Event) => {
          e.stopPropagation();
          onClick?.();
        },
      },
    });
  }

  render() {
    return tmpl;
  }
}
