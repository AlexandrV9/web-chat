import { clsx } from '@/shared/utils';

import styles from './FormUpdateAvatar.module.scss';

export const tmpl = (error: string) => `
  <form class=${styles.form}>
    {{{ Title }}}
    {{{ DropArea }}}

    <span class='${clsx(styles.error, { [styles.visible]: error })}'>
      {{ errorForm }}
    </span>
        
    <div class=${styles.actionSlot}>
      {{{ ButtonSubmit }}}
      {{{ ButtonCancel }}}
    </div>
  </form>
`;
