import cls from './styles.module.scss';

const tmpl = `
  <form class=${cls.signUpForm}>
    <h3 class=${cls.title}>Регистрация</h3>

    {{{Inputs}}}

    {{{SubmitButton}}}

    <p class=${cls.linkWrapper}>
      <a href="../../pages/sign-in/index.html">Войти</a>
    </p>
  </form>
`;

export default tmpl;
