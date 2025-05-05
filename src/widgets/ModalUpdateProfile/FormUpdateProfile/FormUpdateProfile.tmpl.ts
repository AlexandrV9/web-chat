import { clsx } from '@/shared/utils';

import styles from './FormUpdateProfile.module.scss';

export const tmpl = (error: string) => `
  <form class=${styles.form}>
    {{{ Title }}}

    <div>
      {{{ Inputs }}}
    </div>

    <span class='${clsx(styles.error, { [styles.visible]: error })}'>
      {{ errorForm }}
    </span>
        
    <div class=${styles.actionSlot}>
      {{{ ButtonSubmit }}}
      {{{ ButtonCancel }}}
    </div>
  </form>
`;
