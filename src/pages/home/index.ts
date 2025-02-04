import { LeftPanel } from '../../blocks';
import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface HomePageProps {}

export class HomePage extends Block {
  constructor() {
    super('div', {
      leftPanel: new LeftPanel(),
    });
  }

  render() {
    return tmpl;
  }
}
