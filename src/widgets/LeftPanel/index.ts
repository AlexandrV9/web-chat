import { Block } from '@/services/Block';
import { Navbar } from '../Navbar';
import tmpl from './tmpl';
import { ChatsList } from '@/entities';

interface LeftPanelProps {
  title?: string;
}

export class LeftPanel extends Block {
  constructor({ title = '' }: LeftPanelProps) {
    super({
      title,

      Children: new ChatsList(),
      Navbar: new Navbar(),
    });
  }

  render() {
    return tmpl;
  }
}
