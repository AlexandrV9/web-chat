import { APP_ROUTES } from '@/shared/constants';
import styles from './styles.module.scss';

const tmpl = `
  <form class=${styles.signUpForm}>
    <h3 class=${styles.title}>Регистрация</h3>

    {{{Inputs}}}

    <span class=${styles.error}>Некоторые поля формы заполнены не верно</span>

    {{{SubmitButton}}}

    <p class=${styles.linkWrapper}>
      <a data-page="signIn" href=${APP_ROUTES.SIGN_IN}>Войти</a>
    </p>
  </form>
`;

export default tmpl;
