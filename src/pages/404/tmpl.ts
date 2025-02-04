import cls from './styles.module.scss';

const tmpl = `
  <main>
    <h1 class=${cls.codeError}>404</h1>
    <p class=${cls.description}>Не туда попали</p>
    <p class=${cls.wrapperLink}>
      <a href="../home/index.html">Назад к чатам</a>
    </p>
  </main>
`;

export default tmpl;
