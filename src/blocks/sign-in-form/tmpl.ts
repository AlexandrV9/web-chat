import cls from './styles.module.scss';

const tmpl = `
  <form class=${cls.signInForm}>
    <h3 class=${cls.title}>Вход</h3>

    {{{Inputs}}}
     
    {{{ SubmitButton }}}

    <p class=${cls.linkWrapper}>
      <a href="../../pages/sign-up/index.html">Нет аккаунта?</a>
    </p>
  </form>
`;

export default tmpl;

