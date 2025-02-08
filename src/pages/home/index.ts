import { MessagesList } from '@/entities';
import { Block } from '@/services/Block';

import tmpl from './tmpl';
import { LeftPanel } from '@/widgets';

interface HomePageProps {}

export class HomePage extends Block {
  constructor() {
    super({
      LeftPanel: new LeftPanel({
        title: 'Чаты',
      }),
      Children: new MessagesList({}),
    });
  }

  render() {
    return tmpl;
  }
}
