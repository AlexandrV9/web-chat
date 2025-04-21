import styles from './ModalAddUserToChat.module.scss';

export const tmpl = `
  <div class=${styles.content}>
    {{{ Title }}}

    <div class=${styles.container}>
      <form class=${styles.form}>
        {{{ SearchInput }}}
        {{{ SearchButton }}}
      </form>

      <p class=${styles.text}>Результаты поиска</p>
      
      <ul class=${styles.list}>
        {{{ SearchedUsers }}}
      </ul>
    </div>

    <div class=${styles.container}>
      <p class=${styles.text}>Список участников</p>
      <ul class=${styles.list}>
        {{{ AddedUsers }}}
      </ul>
    </div>

  </div> 
`;
