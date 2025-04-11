import cls from './styles.module.scss';

export const tmpl = `
  <div class="page-content">

    {{{LeftPanel}}}

    <div class=${cls.mainContainer}>

      <label class=${cls.profileAvatar}>
        <div class=${cls.fallbackUserAvatar}>

          <svg fill="none" class="icon">
            <use href="shared/assets/icons/index.svg#image"></use>
          </svg>

        </div>

        <div class=${cls.cover}>
          <p class=${cls.textHint}>
            <span>Поменять</span>
            <span>аватар</span>                
          </p>
        </div>

        <input type="file" name="avatar" class="inp-avatar" />
      </label>

      <h3 class=${cls.profileName}>{{profileName}}</h3>

      <form>
        <ul class=${cls.profileInfoList}>
          {{{Inputs}}}
        </ul>
        <ul class=${cls.profileActionsList}>
          <li class=${cls.itemList}><button>Изменить данные</button></li>
          <li class=${cls.itemList}><button>Изменить пароль</button></li>
          <li class=${cls.itemList}>
            {{{SignOutButton}}}
          </li>
        </ul>
      </form>
    </div>
  </div>
`;
