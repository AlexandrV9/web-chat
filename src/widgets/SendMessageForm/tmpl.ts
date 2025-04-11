import cls from './styles.module.scss';

export const tmpl = `
  <form class=${cls.formSendMessage}>

    <button class=${cls.btnAttach}>
      <svg fill="none" class="icon">
        <use href="/shared/assets/icons/index.svg#paper-clip"></use>
      </svg>
    </button>

    {{{InputMessage}}}

    <button class=${cls.btnSendMessage}>
      <svg fill="none" class="icon">
        <use href="/shared/assets/icons/index.svg#arrow-right"></use>
      </svg>
    </button>

  </form>
`;


