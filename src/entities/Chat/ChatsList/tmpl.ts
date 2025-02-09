import cls from './styles.module.scss';

const tmpl = `
  <ul class=${cls.chatsList}>
    {{{Children}}}
  </ul>
`;

export default tmpl;
