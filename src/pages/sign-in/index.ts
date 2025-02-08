import { SignInForm } from '@/widgets';
import { Block } from '../../services/Block';
import tmpl from './tmpl';

export class SignInPage extends Block {
  constructor() {
    super({
      content: new SignInForm(),
    });
  }

  render() {
    return tmpl;
  }
}
