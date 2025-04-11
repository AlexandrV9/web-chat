import { MessagesList } from '@/entities';
import { Block } from '@/shared/services/Block';

import tmpl from './tmpl';
import { LeftPanel, SendMessageForm } from '@/widgets';

export class HomePage extends Block {
  constructor() {
    super({
      LeftPanel: new LeftPanel({
        title: 'Чаты',
      }),
      SendMessageForm: new SendMessageForm(),
      Children: new MessagesList(),
    });
  }

  render() {
    return tmpl;
  }
}
