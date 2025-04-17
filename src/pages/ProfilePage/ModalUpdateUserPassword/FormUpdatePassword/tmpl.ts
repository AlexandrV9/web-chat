import { clsx } from '@/shared/utils';

import styles from './FormUpdatePasswor.module.scss';

export const tmpl = (error: string) => `
  <form class=${styles.form}>
    <h3 class=${styles.title}>Смена пароля</h3>
    <div>
      {{{Inputs}}}
    </div>

    <span class='${clsx(styles.error, { [styles.visible]: error })}'>{{errorForm}}</span>
    <div>
      {{{ButtonSubmit}}}
      {{{ButtonCancel}}}
    </div>
  </form> 
`;
