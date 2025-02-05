import { SignUpForm } from '@/widgets';
import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface SignUpPageProps {}

export class SignUpPage extends Block {
  constructor() {
    super('div', {
      content: new SignUpForm({}),
    });
  }

  render() {
    return tmpl;
  }
}
