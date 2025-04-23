import { Block } from '@/shared/services';
import { Typography } from '@/shared/ui';

export interface ProfileListItemProps {
  title: string;
  value: string;
}

import styles from './ProfileListItem.module.scss';

export class ProfileListItem extends Block {
  constructor({ title, value }: ProfileListItemProps) {
    super({
      Title: new Typography({ text: title, variant: 'text2' }),
      Value: new Typography({ text: value, variant: 'text2' }),
    });
  }
  render() {
    return `
      <li class=${styles.item}>
        {{{ Title }}}
        {{{ Value }}}
      </li>
    `;
  }
}
