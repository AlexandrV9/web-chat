import { clsx } from '@/shared/utils';
import styles from './SignInForm.module.scss';

export const tmpl = (error: string) => `
  <form class=${styles.signInForm} novalidate>
    <h3 class=${styles.title}>Вход</h3>

    {{{ Inputs }}}
    
    <span class='${clsx(styles.error, { [styles.visible]: error })}'>{{errorForm}}</span>

    {{{ SubmitButton }}}

    <p class=${styles.linkWrapper}>
     {{{linkToSignUpPage}}}
    </p>
  </form>
`;
