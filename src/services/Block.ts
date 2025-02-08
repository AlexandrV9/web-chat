import Handlebars from 'handlebars';
import { EventBus } from './EventBus';
import { generateUUID } from '@/shared';

const checkPrivateProp = (prop: any) => prop.startsWith('_');

export type BlockProps = Record<string, any>;

export type TypeLists = Record<string, { id: string; children: unknown[] }>;

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _id: string;

  _element: HTMLElement | null = null;

  props: BlockProps;

  _children: Record<string, Block>;

  _lists: TypeLists;

  _eventBus: EventBus;

  constructor(props = {}) {
    this._eventBus = new EventBus();

    const { children, _lists, _props } = this._getCorrectProps(props);

    this._children = this._makePropsProxy(children);
    this._lists = this._makePropsProxy(_lists);
    this.props = this._makePropsProxy(_props);
    this._id = generateUUID();

    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // **************** Инициализация ****************

  init() {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _createDocumentElement(tag: string) {
    return document.createElement(tag);
  }

  // **************** Рендер ****************

  _render() {
    const tmpl = this.render();

    const buffer = { ...this._children, ...this.props };

    Object.entries(this._lists).forEach(([key, { id }]) => {
      buffer[key] = `<div data-id='${id}'></div>`;
    });

    Object.entries(this._children).forEach(([key, child]) => {
      buffer[key] = `<div data-id='${child._id}'></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(tmpl)(buffer);

    Object.values(this._children).forEach(child => {
      const item = fragment.content.querySelector(`[data-id='${child._id}']`);

      if (item) {
        item.replaceWith(child.getContent() as Node);
      }
    });

    Object.entries(this._lists).forEach(([, item]) => {
      const container = this._createDocumentElement('template') as HTMLTemplateElement;

      item.children.forEach(child => {
        if (child instanceof Block) {
          container.content.append(child.getContent() as Node);
        } else {
          container.content.append(child as Node);
        }
      });

      const insertPoint = fragment.content.querySelector(`[data-id='${item.id}']`);

      if (insertPoint) {
        insertPoint.replaceWith(container.content);
      }
    });

    const parentElement = fragment.content.firstElementChild as HTMLElement;

    if (parentElement && this._element) {
      this._element.replaceWith(parentElement);
    }

    this._element = parentElement;
    this.addEvents();
  }

  render(): string {
    return '';
  }

  _getCorrectProps(props: BlockProps) {
    const children: Record<string, Block> = {};

    const _lists: TypeLists = {};

    const _props: BlockProps = {};

    for (const key of Object.keys(props)) {
      const value = props[key];

      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        const uuid = generateUUID();

        _lists[key] = { id: uuid, children: value };
      } else {
        _props[key] = value;
      }
    }

    return {
      children,
      _props,
      _lists,
    };
  }

  // **************** Монтирование ****************

  _componentDidMount(oldProps: BlockProps) {
    this.componentDidMount(oldProps);
  }

  componentDidMount(oldProps: BlockProps) {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  // **************** Обновление ****************

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) return;

    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    return true;
  }

  // **************** Работа с событиями ****************

  addEvents() {
    const { events = {} } = this.props;

    if(!events || !this._element) return;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName])
    })
  }

  removeEvents() {}

  getContent() {
    return this._element;
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _makePropsProxy(props: any): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target: any, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: any, prop: string, value: any) {
        const oldTarget = { ...target };

        target[prop] = value;
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    });
  }
}
