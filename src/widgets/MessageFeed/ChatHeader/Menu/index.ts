import { Block } from '@/shared/services';

import { tmpl } from './Menu.tmpl';
import { MenuItem } from './MenuItem';

export interface MenuProps {
  Items: MenuItem[];
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
