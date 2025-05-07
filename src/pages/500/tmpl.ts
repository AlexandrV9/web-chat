import cls from './ServerError.module.scss';

export const tmpl = `
  <div class="content-page">
    <h1 class=${cls.codeError}>500</h1>
    <p class=${cls.description}>Мы уже фиксим</p>
    <p class=${cls.wrapperLink}>
      <a href="../home/index.html">Назад к чатам</a>
    </p>
  </div>
`;
