import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface NotFoundPageProps {}

export class NotFoundPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return tmpl;
  }
}
