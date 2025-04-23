export const WINDOW_CUSTOM_EVENTS = {
  REPLACE_STATE: 'replacestate',
  PUSH_STATE: 'pushstate',
  LOCATION_CHANGE: 'locationchange',
};

const dispatchEventPushState = () => {
  window.dispatchEvent(new CustomEvent(WINDOW_CUSTOM_EVENTS.PUSH_STATE));
};

const dispatchEventReplaceState = () => {
  window.dispatchEvent(new CustomEvent(WINDOW_CUSTOM_EVENTS.REPLACE_STATE));
};

const dispatchEventLocationChange = (url: string) => {
  window.dispatchEvent(new CustomEvent(WINDOW_CUSTOM_EVENTS.LOCATION_CHANGE, { detail: { url } }));
};

export class WindowAPI {
  static addReplaceStateEvent() {
    window.history.replaceState = new Proxy(window.history.replaceState, {
      apply(target, thisArg, args) {
        dispatchEventReplaceState();
        dispatchEventLocationChange(args[2]);
        Reflect.apply(target, thisArg, args);
      },
    });
  }

  static addPushStateEvent() {
    window.history.pushState = new Proxy(window.history.pushState, {
      apply(target, thisArg, args) {
        dispatchEventPushState();
        dispatchEventLocationChange(args[2]);
        Reflect.apply(target, thisArg, args);
      },
    });
  }

  static updatePopStateEvent() {
    window.addEventListener('popstate', event => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatchEventLocationChange(event?.currentTarget?.location?.pathname);
    });
  }

  static updateChangeRouteEvents() {
    WindowAPI.addReplaceStateEvent();
    WindowAPI.addPushStateEvent();
    WindowAPI.updatePopStateEvent();
  }
}
