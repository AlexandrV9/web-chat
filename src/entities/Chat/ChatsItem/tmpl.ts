import cls from './styles.module.scss';

const tmpl = `
  <li class=${cls.chatItem}>
    <div class=${cls.avatar}>И</div>
    <div class=${cls.container}>

      <div class=${cls.titleWrapper}>
        <p class=${cls.title}>Андрей</p>
        <span class=${cls.time}>10:49</span>
      </div>

      <div class=${cls.content}>
        <p class=${cls.message}>Друзья, у меня для вас особенный выпуск новостей!...</p>
        <div class=${cls.counter}>2</div>
      </div>
    </div>
  </li>
`;

export default tmpl;
