import { Block } from '../../services/Block';
import tmpl from './tmpl';

export class ServerErrorPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return tmpl;
  }
}
