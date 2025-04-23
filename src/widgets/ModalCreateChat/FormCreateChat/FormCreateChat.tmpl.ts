import styles from './FormCreateChat.module.scss';

export const tmpl = `
  <form class=${styles.form}>
    <h3 class=${styles.title}>Создание нового чата</h3>
    {{{ Input }}}
    
    <div class=${styles.actionSlot}>
      {{{ SumitButton }}}
      {{{ CancelButton }}}
    </div>
  </form>

`;
