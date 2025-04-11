import { SignUpForm } from '@/widgets';
import { Block } from '@/shared/services';
import { tmpl } from './tmpl';

export class SignUpPage extends Block {
  constructor() {
    super({
      content: new SignUpForm(),
    });
  }

  render() {
    return tmpl;
  }
}
