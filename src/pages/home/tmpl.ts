import cls from './styles.module.scss';

const tmpl = `
  <div div class="page-content">

    {{{ LeftPanel }}}

    <section class=${cls.mainContainer}>
      <div class=${cls.top}>
        <div class=${cls.chatInfo}>
          <div class=${cls.fallbackChatAvatar}></div>
          <h3 class=${cls.chatTitle}>Вадим</h3>
        </div>

        <div class=${cls.actionSlot}>
          <button class=${cls.btnChatActions}>

            <svg fill="none" class="icon">
              <use href="/assets/icons/index.svg#ellipsis-v"></use>
            </svg>

          </button>
        </div>
      </div>

      {{{Children}}}

      <div class=${cls.bottom}>
        <form class=${cls.formSendMessage}>
          <button class=${cls.btnAttach}>

            <svg fill="none" class="icon">
              <use href="/assets/icons/index.svg#paper-clip"></use>
            </svg>

          </button>

          <input class=${cls.inpTextMessage} placeholder="Введите сообщение..." name="message" />

          <button class=${cls.btnSendMessage}>

            <svg fill="none" class="icon">
              <use href="/assets/icons/index.svg#arrow-right"></use>
            </svg>


          </button>
        </form>
      </div>
    </section>

  </div>
`;

export default tmpl;


// <div class=${cls.main}>
// <div class=${cls.fallbackContainer}>
//   <p>Выберите чат чтобы отправить сообщение</p>
// </div>
// </div>
