import { Block } from '@/shared/services';
import tmpl from './tmpl';

export class NotFoundPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return tmpl;
  }
}
