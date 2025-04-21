import { Block } from '@/shared/services';
import { tmpl } from './UserItem.tmpl';
import { Typography } from '@/shared/ui';

export interface UserItemProps {
  title: string;
  ActionButton?: Block | null;
}

export class UserItem extends Block {
  constructor({ title, ActionButton = null }: UserItemProps) {
    super({
      Text: new Typography({ text: title, variant: 'text2' }),
      ActionButton,
    });
  }

  render() {
    return tmpl;
  }
}
