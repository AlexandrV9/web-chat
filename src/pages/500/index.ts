import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface ServerErrorPageProps {}

export class ServerErrorPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return tmpl;
  }
}
