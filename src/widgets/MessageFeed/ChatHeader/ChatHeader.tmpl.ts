import styles from './ChatHeader.module.scss';

export const tmpl = `
  <div class=${styles.header}>
    <div class=${styles.chatInfo}>
      <div class=${styles.fallbackChatAvatar}></div>
      <h3 class=${styles.chatTitle}>{{ chatTitle }}</h3>
    </div>
    
    <div class=${styles.actionSlot}>
      {{{ ActionSlot }}}
    </div>

    {{{ ModalAddUserToChat }}}
    {{{ ModalDeleteUserFromChat }}}
  </div>
`;
