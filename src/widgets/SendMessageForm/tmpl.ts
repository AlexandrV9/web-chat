import cls from './styles.module.scss';

const tmpl = `
  <form class=${cls.formSendMessage}>

    <button class=${cls.btnAttach}>
      <svg fill="none" class="icon">
        <use href="/assets/icons/index.svg#paper-clip"></use>
      </svg>
    </button>

    {{{InputMessage}}}

    <button class=${cls.btnSendMessage}>
      <svg fill="none" class="icon">
        <use href="/assets/icons/index.svg#arrow-right"></use>
      </svg>
    </button>

  </form>
`;

export default tmpl;

