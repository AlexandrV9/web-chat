import { Block } from '../../services/Block';
import tmpl from './tmpl';

export class NotFoundPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return tmpl;
  }
}
