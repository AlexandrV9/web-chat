import { HomePage, NotFoundPage, ProfilePage, ServerErrorPage, SignInPage, SignUpPage } from './pages';
import { renderDOM } from './shared';

const signInPage = new SignInPage();
// const signUpPage = new SignUpPage();
// const notFoundPage = new NotFoundPage();
// const serverErrorPage = new ServerErrorPage();
// const homePage = new HomePage();
// const profilePage = new ProfilePage();

renderDOM('.app', signInPage);
