import { Block } from '@/shared/services';
import { tmpl } from './tmpl';

export class ServerErrorPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return tmpl;
  }
}
