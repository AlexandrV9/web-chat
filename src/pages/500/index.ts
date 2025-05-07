import { Block } from '@/shared/services';
import tmpl from './tmpl';

cons a = "dd"

export class ServerErrorPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return tmpl;
  }
}
