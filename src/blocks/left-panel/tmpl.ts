import cls from './styles.module.scss';

  // iconPath="/assets/icons/index.svg#users"
  //           linkPath="/pages/home/index.html"

const tmpl = `
  <aside class="left-panel">
    <section class="top">

      <h3 class="title">Чаты</h3>

      <button class=${cls.btnEdit}>
        <svg fill="none" class="icon">
          <use href="/assets/icons/index.svg#pencil-square"></use>
        </svg>
      </button>

    </section>

    <div class=${cls.searchChats}>
      <input
        type="text"
        class=${cls.inpSearchChats}
        placeholder="Введите название чата..."
      />
    </div>

    <ul class=${cls.chatList}>
      <li class=${cls.chatListItem}>Чат 01</li>
      <li class=${cls.chatListItem}>Чат 02</li>
      <li class=${cls.chatListItem}>Чат 03</li>
      <li class=${cls.chatListItem}>Чат 99</li>
    </ul>

    {{{ navbar }}}

  </aside>
`;

export default tmpl;

