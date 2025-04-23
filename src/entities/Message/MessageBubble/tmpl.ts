import cls from './styles.module.scss';

const tmpl = `
  <div class='${cls.messageBubble} {{className}}'>
    <div class=${cls.message}>
      {{ content }}
    </div>

    <div class=${cls.meta}>
      <div class=${cls.status}></div>
      <div class=${cls.timeCreated}>10:10</div>
    </div>
  </div>
`;

export default tmpl;
