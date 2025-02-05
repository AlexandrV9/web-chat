import { SignInForm } from '@/widgets';
import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface SignInPageProps {}

export class SignInPage extends Block {
  constructor() {
    super('div', {
      content: new SignInForm({}),
    });
  }

  render() {
    return tmpl;
  }
}
