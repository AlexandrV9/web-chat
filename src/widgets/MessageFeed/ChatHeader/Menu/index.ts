import { Block } from '@/shared/services';

import { tmpl } from './Menu.tmpl';

export interface MenuProps {
  Items: any[];
}

export class Menu extends Block {
  constructor({ Items }: MenuProps) {
    super({
      Items,
    });
  }

  render() {
    return tmpl;
  }
}

export * from './MenuItem';
