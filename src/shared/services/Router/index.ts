import { Block } from '../Block';
import { WINDOW_CUSTOM_EVENTS } from '../Window';
import { Route } from './Route';

export class Router {
  public routes: Route[] = [];
  public history: History | null = null;

  private _currentRoute: Route | null = null;
  private _rootQuery = '';
  private _pathnames: string[] = [];
  private _publicPathnames: string[] = [];
  private _onRouteCallback!: () => void;

  static __instance: null | Router;

  constructor(rootNodeQuerySelector: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;

    this._publicPathnames = [];
    this._currentRoute = null;
    this._rootQuery = rootNodeQuerySelector;
    this._onRouteCallback = () => {};

    Router.__instance = this;
  }

  use(pathname: string, block: new () => Block) {
    const route = new Route(pathname, block, { insertPointInDOM: this._rootQuery });

    this.routes.push(route);
    this._pathnames.push(pathname);

    return this;
  }

  public start() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener(
      WINDOW_CUSTOM_EVENTS.LOCATION_CHANGE,
      ((location: { detail: { url: string } }) => {
        const pathname = this._hasRoute(location.detail.url);

        this._onRoute(pathname);
      }).bind(this),
    );

    const pathname = this._hasRoute(window.location.pathname);
    this._onRoute(pathname);
  }

  public onRoute(callback: () => void) {
    this._onRouteCallback = callback;
    return this;
  }

  public setPublicPathnames(pathnames: string[]) {
    this._publicPathnames = pathnames;
    return this;
  }

  private _hasRoute(pathname: string) {
    if (!this._pathnames.includes(pathname)) {
      return '*';
    }

    return pathname;
  }

  private _onRoute(pathname: string) {
    const route = this.getRouteByPathname(pathname);

    if (!route) return;

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();

    if (!this._publicPathnames.includes(pathname)) {
      this._onRouteCallback();
    }
  }

  public getCurrentRoute() {
    return this._currentRoute;
  }

  public getRouteByPathname(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  public goToNextPage() {
    window.history.forward();
  }

  public goToPrevPage() {
    window.history.back();
  }

  public goByPathname(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }
}

export const router = new Router('#app');
