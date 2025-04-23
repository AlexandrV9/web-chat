import { Block } from '@/shared/services';
import { Typography } from '@/shared/ui';

import { tmpl } from './ChatNotSelected.tmpl';

export class ChatNotSelected extends Block {
  constructor() {
    super({
      Text: new Typography({ text: 'Выберите чат из списка', variant: 'text2' }),
    });
  }

  render() {
    return tmpl;
  }
}
