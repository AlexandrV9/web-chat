import styles from './MessageFeed.module.scss';

export const tmpl = `
  <section class=${styles.mainContainer}>
    <div class=${styles.top}>
      <div class=${styles.chatInfo}>
        <div class=${styles.fallbackChatAvatar}></div>
        <h3 class=${styles.chatTitle}>Вадим</h3>
      </div>
    
      <div class=${styles.actionSlot}>
        {{{ActionButton}}}
      </div>
    </div>
    
    {{{messageList}}}
    
    <div class=${styles.bottom}>
      {{{SendMessageForm}}}
    </div>
  </section>
`;
