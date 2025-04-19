import { Block } from '@/shared/services';
import { tmpl } from './Navbar.tmpl';
import { Link, Icon } from '@/shared/ui';
import { APP_ROUTES } from '@/shared/constants';

import chatBubbleIcon from '@/shared/assets/icons/chat-bubble-left-right.svg';
import userIcon from '@/shared/assets/icons/user-circle.svg';

export class Navbar extends Block {
  constructor() {
    super({
      MessengerLink: new Link({
        to: APP_ROUTES.CONVERSATIONS,
        children: new Icon({
          src: chatBubbleIcon,
        }),
      }),
      SettingsLink: new Link({
        to: APP_ROUTES.SETTINGS,
        children: new Icon({
          src: userIcon,
        }),
      }),
    });
  }

  render() {
    return tmpl;
  }
}
