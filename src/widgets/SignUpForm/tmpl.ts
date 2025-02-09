import cls from './styles.module.scss';

const tmpl = `
  <form class=${cls.signUpForm}>
    <h3 class=${cls.title}>Регистрация</h3>

    {{{Inputs}}}

    <span class=${cls.error}>Некоторые поля формы заполнены не верно</span>

    {{{SubmitButton}}}

    <p class=${cls.linkWrapper}>
      <a data-page="signIn">Войти</a>
    </p>
  </form>
`;

export default tmpl;
