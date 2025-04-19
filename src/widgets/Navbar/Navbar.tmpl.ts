import cls from './Navbar.module.scss';

export const tmpl = `
  <nav class=${cls.navbar}>
    <ul class=${cls.navList}>
      <li class=${cls.navListItem}>
        {{{ MessengerLink }}}
      </li>
      <li class=${cls.navListItem}>
        {{{ SettingsLink }}}
      </li>
    </ul>
  </nav>
`;
