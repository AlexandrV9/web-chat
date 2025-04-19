import { Block } from '@/shared/services/Block';
import { renderElementInDOM } from '@/shared/utils';

export type RouteOptions = {
  insertPointInDOM: string;
};

export class Route {
  private _pathname: string;
  private _options: RouteOptions;
  private _block: null | Block;
  private _blockClass: new () => Block;

  constructor(pathname: string, blockClass: new () => Block, options: RouteOptions) {
    this._pathname = pathname;
    this._blockClass = blockClass;
    this._block = null;
    this._options = options;
  }

  leave() {
    this._block?.remove();
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = new this._blockClass();
    renderElementInDOM(this._options.insertPointInDOM, this._block);

    this._block.show();
  }
}
