import styles from './LeftPanel.module.scss';

export const tmpl = `
  <aside class=${styles.leftPanel}>
  
    <section class=${styles.top}>
      <h3 class=${styles.title}>{{ title }}</h3>
      {{{ ActionButton }}}
    </section>

    <div class=${styles.searchChats}>
      <input
        type="text"
        class=${styles.inpSearchChats}
        placeholder="Введите название чата..."
      />
    </div>

    {{{ children }}}
    {{{ Navbar }}}
    {{{ ModalCreateChat }}}
  </aside>
`;
