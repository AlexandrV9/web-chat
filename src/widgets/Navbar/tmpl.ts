import cls from './styles.module.scss';

const tmpl = `
  <nav class=${cls.navbar}>
    <ul class=${cls.navList}>

      <li class=${cls.navListItem}>
        <a class="nav-link" href="#1">
          <svg class=${cls.navIcon} fill="none">
            <use href="/assets/icons/index.svg#users"></use>
          </svg>
        </a>
      </li>

      <li class=${cls.navListItem}>
        <a data-page="home">
          home
        </a>
      </li>

      <li class=${cls.navListItem}>
        <a data-page="profile">
          profile
        </a>
      </li>

    </ul>
  </nav>
`;

export default tmpl;

// {{> navListItem
//   iconPath="/assets/icons/index.svg#chat-bubble-left-right"
//   linkPath="/pages/home/index.html"
// }}

// {{> navListItem
//   iconPath="/assets/icons/index.svg#user-circle"
//   linkPath="/pages/profile/index.html"
// }}
