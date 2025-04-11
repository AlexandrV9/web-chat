import { Block } from '@/shared/services';
import { tmpl } from './tmpl';
import { Link, Image } from '@/shared/ui';

export class Navbar extends Block {
  constructor() {
    super({
      MessengerLink: new Link({
        href: '/messenger',
        children: new Image({
          src: '../../shared/assets/icons/chat-bubble-left-right.svg',
        }),
      }),
      SettingsLink: new Link({
        href: '/settings',
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
