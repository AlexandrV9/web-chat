import { SignInForm } from '@/widgets';
import { Block } from '@/shared/services';
import { tmpl } from './tmpl';

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
