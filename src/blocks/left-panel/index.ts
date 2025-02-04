import { Block } from '../../services/Block';
import { Navbar } from '../navbar';

import tmpl from './tmpl';

export class LeftPanel extends Block {
  constructor() {
    super('div', {
      navbar: new Navbar(),
    });
  }

  render() {
    return tmpl;
  }
}
