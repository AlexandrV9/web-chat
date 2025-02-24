import cls from './styles.module.scss';

const tmpl = `
  <aside class=${cls.leftPanel}>
    <section class=${cls.top}>

      <h3 class=${cls.title}>{{title}}</h3>

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

    {{{Children}}}

    {{{Navbar}}}

  </aside>
`;

export default tmpl;
