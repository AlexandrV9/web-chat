/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import Handlebars from 'handlebars';
import { EventBus } from '../EventBus';
import { generateUUID } from '@/shared/utils';
import { isBlock } from './helpers';
import { isArray } from '@/shared/utils/_common';

export type BlockProps = Record<string, any>;

export type TypeLists = Record<string, { id: string; children: unknown[] }>;

// TODO: сделать передачу тип пропсов в виде дженерика в Block,
export abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  _id: string;
  _element: HTMLElement | null = null;
  _children: Record<string, Block>;
  _lists: TypeLists;
  private _eventBus: EventBus;

  props: BlockProps;

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

  private _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // **************** Инициализация ****************

  init() {
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _createDocumentElement(tag: string) {
    return document.createElement(tag);
  }

  // **************** Рендер ****************

  private _render() {
    this._removeEvents();

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

  private _getCorrectProps(props: BlockProps) {
    const children: Record<string, Block> = {};
    const lists: TypeLists = {};
    const cleanProps: BlockProps = {};

    for (const key of Object.keys(props)) {
      const value = props[key];

      if (isBlock(value)) {
        children[key] = value;
      } else if (isArray(value)) {
        lists[key] = { id: generateUUID(), children: value };
      } else {
        cleanProps[key] = value;
      }
    }

    return {
      children,
      _props: cleanProps,
      _lists: lists,
    };
  }

  private _componentDidMount(oldProps: BlockProps) {
    this.componentDidMount(oldProps);
  }

  componentDidMount(oldProps: BlockProps) {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) return;

    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    return true;
  }

  addEvents() {
    const { events = {} } = this.props;

    if (!events || !this._element) return;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      if (events[eventName] !== undefined) {
        this._element?.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  getContent() {
    return this._element;
  }

  getProp(name: string) {
    return this.props[name];
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    const { children, _lists, _props } = this._getCorrectProps(nextProps);

    Object.assign(this._children, children);
    Object.assign(this.props, _props);
    Object.assign(this._lists, _lists);
  };

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target: any, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: any, prop: string, value: any) {
        const oldTarget = { ...target };

        target[prop] = value;
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  show() {
    console.log('show');
  }

  hide() {
    if (this._element) {
      this._element.remove();
    }
  }
}
