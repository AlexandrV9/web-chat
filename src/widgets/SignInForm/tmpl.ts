import cls from './styles.module.scss';

const tmpl = `
  <form class=${cls.signInForm}>
    <h3 class=${cls.title}>Вход</h3>

    {{{Inputs}}}
    
   <span class=${cls.error}>Некоторые поля формы заполнены не верно</span>

    {{{SubmitButton}}}

    <p class=${cls.linkWrapper}>
      <a data-page="signUp" href="#">Нет аккаунта?</a>
    </p>
  </form>
`;

export default tmpl;

