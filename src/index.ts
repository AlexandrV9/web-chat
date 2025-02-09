import { HomePage, NotFoundPage, ProfilePage, ServerErrorPage, SignInPage, SignUpPage } from './pages';

type Page = 'signIn' | 'signUp' | 'home' | 'profile' | '404' | '500';

export default class App {
  appElement: HTMLElement | null;
  currentPage: Page;
  currentPageElement: HTMLElement | null;

  constructor() {
    this.currentPage = 'signIn';
    this.appElement = document.getElementById('app');

    this.currentPageElement = null;
  }

  render() {
    const pageContent = this.getPageContent();

    if (!this.appElement || !pageContent) return;

    this.appElement.innerHTML = '';
    this.appElement.append(pageContent);
    this.attachEventListeners();
  }

  getPageContent(): HTMLElement | null {
    switch (this.currentPage) {
      case 'signIn':
        return new SignInPage().getContent();
      case 'signUp':
        return new SignUpPage().getContent();
      case 'profile':
        return new ProfilePage().getContent();
      case 'home':
        return new HomePage().getContent();
      case '404':
        return new NotFoundPage().getContent();
      case '500':
        return new ServerErrorPage().getContent();
      default:
        return null;
    }
  }

  attachEventListeners() {
    const links = document.querySelectorAll('a[data-page]');
    const buttons = document.querySelectorAll("button[id]");

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const link = e.target as HTMLLinkElement;

        if (!link.dataset.page) return;

        this.changePage(link.dataset.page as Page);
      });
    });

    buttons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const btn = e.target as HTMLButtonElement;

        const page = btn.getAttribute('id')

        if (!page) return;

        this.changePage(page as Page);
      });
    });
  }

  changePage(page: Page): void {
    this.currentPage = page;
    this.render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();

  app.render();
});
