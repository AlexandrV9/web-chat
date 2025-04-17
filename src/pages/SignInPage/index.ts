import { SignInForm } from '@/widgets';
import { Block } from '@/shared/services';

import styles from './SignInPage.module.scss';

export class SignInPage extends Block {
  constructor() {
    super({
      content: new SignInForm(),
    });
  }

  render() {
    return `
      <main class=${styles.signInPage}>
        {{{content}}}
      </main>
    `;
  }
}
