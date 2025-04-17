import { clsx } from '@/shared/utils';
import styles from './SignUpForm.module.scss';

export const tmpl = (error: string) => `
  <form class=${styles.signUpForm}>
    <h3 class=${styles.title}>Регистрация</h3>

    {{{Inputs}}}

    <span class='${clsx(styles.error, { [styles.visible]: error })}'>{{errorForm}}</span>

    {{{SubmitButton}}}

    <p class=${styles.linkWrapper}>
      {{{linkToSignInPage}}}
    </p>
  </form>
`;
