import { Block } from '@/shared/services';
import { tmpl } from './tmpl';
import { Link, Image } from '@/shared/ui';
import { APP_ROUTES } from '@/shared/constants';

export class Navbar extends Block {
  constructor() {
    super({
      MessengerLink: new Link({
        to: APP_ROUTES.CONVERSATIONS,
        children: new Image({
          src: '../../shared/assets/icons/chat-bubble-left-right.svg',
        }),
      }),
      SettingsLink: new Link({
        to: APP_ROUTES.SETTINGS,
        children: new Image({
          src: '../../shared/assets/icons/user-circle.svg',
        }),
      }),
    });
  }

  render() {
    return tmpl;
  }
}
