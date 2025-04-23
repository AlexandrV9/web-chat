import styles from './MessageFeed.module.scss';

export const tmpl = `
  <section class=${styles.mainContainer}>
    {{{ ChatHeader }}}
    {{{ MessageList }}}
    {{{ SendMessageForm }}}
    {{{ ChatNotSelected }}}
  </section>
`;
