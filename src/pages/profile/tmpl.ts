import cls from './styles.module.scss';

const tmpl = `
  <div class="page-content">

    {{{LeftPanel}}}

    <div class=${cls.mainContainer}>

      <label class=${cls.profileAvatar}>
        <div class=${cls.fallbackUserAvatar}>

          <svg fill="none" class="icon">
            <use href="/assets/icons/index.svg#image"></use>
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

      <h3 class=${cls.profileName}>Иван</h3>

      <form>
        <ul class=${cls.profileInfoList}>

          {{{Inputs}}}

        </ul>

        <ul class=${cls.profileActionsList}>
          <li class=${cls.itemList}><button>Изменить данные</button></li>
          <li class=${cls.itemList}><button>Изменить пароль</button></li>
          <li class=${cls.itemList}><button>Выйти</button></li>
        </ul>

      </form>
    </div>
  </div>
`;

export default tmpl;
