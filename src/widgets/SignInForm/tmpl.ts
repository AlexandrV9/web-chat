import { APP_ROUTES } from '@/shared/constants';
import styles from './styles.module.scss';

const tmpl = `
  <form class=${styles.signInForm} novalidate>
    <h3 class=${styles.title}>Вход</h3>

    {{{Inputs}}}
    
    <span class=${styles.error}>Некоторые поля формы заполнены не верно</span>

    {{{SubmitButton}}}

    <p class=${styles.linkWrapper}>
      <a href=${APP_ROUTES.SIGN_UP}>Нет аккаунта?</a>
    </p>
  </form>
`;

export default tmpl;
