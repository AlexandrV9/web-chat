import styles from './SendMessageForm.module.scss';

export const tmpl = `
  <div class=${styles.bottom}>
    <form class=${styles.formSendMessage}>
      {{{ ButtonAttach }}}
      {{{ InputMessage }}}
      {{{ ButtonSubmit }}}
    </form>
  </div>
`;
