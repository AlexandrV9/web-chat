import { Block } from '@/shared/services/Block';

import tmpl from './HomePage.tmpl';
import { LeftPanel } from '@/widgets';
import { MessageFeed } from '@/widgets/MessageFeed';

export class HomePage extends Block {
  constructor() {
    super({
      LeftPanel: new LeftPanel({
        title: 'Чаты',
      }),
      MessageFeed: new MessageFeed(),
    });
  }

  render() {
    return tmpl;
  }
}
