import { Block } from '@/shared/services';
import { Link } from '@/shared/ui';

import styles from './NotFoundPage.module.scss';
import { APP_ROUTES } from '@/shared/constants';

export class NotFoundPage extends Block {
  constructor() {
    super({
      linkToMainPage: new Link({
        className: styles.wrapperLink,
        to: APP_ROUTES.CONVERSATIONS,
        children: 'Назад к чатам',
      }),
    });
  }

  render() {
    return `
      <main class=${styles.page}>
        <h1 class=${styles.codeError}>404</h1>
        <p class=${styles.description}>Не туда попали</p>
        {{{linkToMainPage}}}
      </main>
    `;
  }
}
