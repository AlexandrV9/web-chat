import Handlebars from 'handlebars';
import { EventBus } from '../EventBus';
import { generateUUID } from '@/shared/utils';
import { isBlock } from './helpers';
import { isArray } from '@/shared/utils/_common';
import { PlainObject } from '@/types';

export type BlockProps = PlainObject;

export abstract class Block<TProps extends BlockProps = BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  public id: string;
  public props: TProps;

  private _eventBus: EventBus;
  private _element: HTMLElement | null = null;

  constructor(props: Partial<TProps> & BlockProps = {}) {
    this.id = generateUUID();
    this.props = this._makePropsProxy(props);
    this._eventBus = new EventBus();
    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount(oldProps: Partial<TProps>) {
    this.componentDidMount(oldProps);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(oldProps: Partial<TProps>, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
  }

  public componentWillUnmount() {}

  private _render() {
    this._removeEvents();
    this._componentWillUnmount();

    const templateProps = this._generateTemplateProps();
    const templateTree = this._generateMarkupTemplateTree(templateProps);
    const markup = this._generateMarkup(templateTree, templateProps);

    this._setMarkupInElement(markup);
    this._addEvents();
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      if (events[eventName] !== undefined) {
        this._element?.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  private _addEvents() {
    const { events = {} } = this.props;

    if (!events || !this._element) return;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _generateTemplateProps() {
    const props: PlainObject = { ...this.props };

    Object.entries(props).forEach(([key, value]) => {
      if (isBlock(value)) {
        props[key] = this._generateChildPlaceholder(value);
      }

      if (isArray(value)) {
        props[key] = value
          .map((item: Block | unknown) => {
            return isBlock(item) ? this._generateChildPlaceholder(item) : item;
          })
          .join('');
      }
    });

    return props;
  }

  private _generateMarkupTemplateTree(markupProps: PlainObject) {
    const tmpl = this.render();
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(tmpl)(markupProps);

    return fragment;
  }

  private _generateMarkup(template: HTMLTemplateElement, templateProps: PlainObject) {
    Object.keys(templateProps).forEach(key => {
      const originalValue = this.props[key];

      if (isBlock(originalValue)) {
        this._replaceChildWithBlock(template, originalValue);
      }

      if (isArray(originalValue)) {
        originalValue.forEach((item: Block | unknown) => {
          if (isBlock(item)) {
            this._replaceChildWithBlock(template, item);
          }
        });
      }
    });

    return template.content.firstElementChild as HTMLElement;
  }

  private _createDocumentElement(tag: string) {
    return document.createElement(tag);
  }

  private _generateChildPlaceholder(block: Block) {
    return `<div data-id='${block.id}'></div>`;
  }

  private _replaceChildWithBlock(fragment: HTMLTemplateElement, block: Block) {
    const child = fragment.content.querySelector(`[data-id='${block.id}']`);

    try {
      child?.replaceWith(block?.getContent() as Node);
    } catch (e) {
      console.log(e);
    }
  }

  private _setMarkupInElement(markup: HTMLElement) {
    this._element?.replaceWith(markup);
    this._element = markup;
  }

  public render() {
    return '';
  }

  public getContent() {
    return this._element;
  }

  public getProps() {
    return this.props as Required<TProps>;
  }

  public getPropValue(name: string) {
    return this.props[name];
  }

  public setProps = <T extends BlockProps>(nextProps: T) => {
    if (nextProps) {
      Object.assign(this.props, nextProps);
    }
  };

  private _makePropsProxy(props: PlainObject): TProps {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        const oldTarget = { ...target };

        target[prop] = value;
        this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as TProps;
  }

  public componentDidMount(_oldProps: Partial<TProps>) {}

  public componentDidUpdate(oldProps: Partial<TProps>, newProps: TProps): boolean {
    return oldProps !== newProps;
  }

  public remove() {
    if (this._element) {
      this._eventBus.emit(Block.EVENTS.FLOW_CWU);
      this._element?.remove();
    }
  }

  public show() {
    if (this._element) {
      this._element.classList.remove('hide');
    }
  }

  public hide() {
    if (this._element) {
      this._element.classList.add('hide');
    }
  }
}
