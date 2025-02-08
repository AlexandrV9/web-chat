import cls from './styles.module.scss';

const tmpl = `
  <div class=${cls.signInForm}>
    <h3 class=${cls.title}>Вход</h3>

    {{{Inputs}}}
     
    {{{ SubmitButton }}}

    <p class=${cls.linkWrapper}>
      <a href="../../pages/sign-up/index.html">Нет аккаунта?</a>
    </p>
  </div>
`;

export default tmpl;

