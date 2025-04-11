import { APP_ROUTES } from './shared/constants';
import { HomePage, NotFoundPage, ProfilePage, ServerErrorPage, SignInPage, SignUpPage } from './pages';
import { Router } from './shared/services';
import { WindowAPI } from './shared/services/Window';
import { AuthAPI } from './shared/api';
import { navigate } from './shared/utils';

WindowAPI.updateChangeRouteEvents();

async function checkIsAuth() {
  try {
    const response = await AuthAPI.getAuthUser();

    if (response.ok) {
      if (window.location.pathname === APP_ROUTES.SIGN_IN || window.location.pathname === APP_ROUTES.SIGN_UP) {
        navigate(APP_ROUTES.CONVERSATIONS);
      }
    }
  } catch (e) {}
}

export class App {
  start() {
    const router = new Router('#app');

    router
      .use(APP_ROUTES.SIGN_IN, SignInPage)
      .use(APP_ROUTES.SIGN_UP, SignUpPage)
      .use(APP_ROUTES.SETTINGS, ProfilePage)
      .use(APP_ROUTES.CONVERSATIONS, HomePage)
      .use(APP_ROUTES.SERVER_ERROR, ServerErrorPage)
      .use(APP_ROUTES.NOT_FOUND, NotFoundPage);

    checkIsAuth();

    router.start();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.start();
});
