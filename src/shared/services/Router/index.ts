import { Block } from '../Block';
import { WINDOW_CUSTOM_EVENTS } from '../Window';
import { Route } from './Route';

export class Router {
  public routes: Route[] = [];
  public history: History | null = null;

  private _currentRoute: Route | null = null;
  private _rootQuery = '';

  static __instance: null | Router;

  constructor(rootNodeQuerySelector: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;

    this._currentRoute = null;
    this._rootQuery = rootNodeQuerySelector;

    Router.__instance = this;
  }

  use(pathname: string, block: new () => Block) {
    const route = new Route(pathname, block, { insertPointInDOM: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener(
      WINDOW_CUSTOM_EVENTS.LOCATION_CHANGE,
      ((location: { detail: { url: string } }) => {
        this._onRoute(location.detail.url);
      }).bind(this),
    );

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRouteByPathname(pathname);
    if (!route) return;

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  getRouteByPathname(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  goToNextPage() {
    window.history.forward();
  }

  goToPrevPage() {
    window.history.back();
  }

  goByPathname(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }
}
