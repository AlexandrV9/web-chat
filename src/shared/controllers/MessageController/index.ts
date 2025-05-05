import { store } from '@/shared/services';
import { ReqWebSocketConnect } from './types';
import { convertObjKeysToCamelCase } from '@/shared/utils';
import { Message } from '@/types';

const sortedMessages = (messages: Message[]) => {
  return messages.sort((a, b) => {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  });
};

class MessageController {
  private _ws!: WebSocket;
  private _userId!: number;
  private _chatId!: number;
  private _token!: string;
  private _ping!: NodeJS.Timeout;
  private _retryCount = 0;

  constructor() {
    this._handleOpen = this._handleOpen.bind(this);
    this._handleMassage = this._handleMassage.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleError = this._handleError.bind(this);
  }

  private _addEvents() {
    this._ws.addEventListener('open', this._handleOpen);
    this._ws.addEventListener('close', this._handleClose);
    this._ws.addEventListener('message', this._handleMassage);
    this._ws.addEventListener('error', this._handleError);
  }

  private _removeEvents() {
    this._ws.removeEventListener('open', this._handleOpen);
    this._ws.removeEventListener('close', this._handleClose);
    this._ws.removeEventListener('message', this._handleMassage);
    this._ws.addEventListener('error', this._handleError);
  }

  private _handleOpen() {
    console.log('Соединение установлено');
    this.getMessages({ offset: 0 });

    this._ping = setInterval(() => {
      this._ws.send(
        JSON.stringify({
          content: '',
          type: 'ping',
        }),
      );
    }, 10000);
  }

  private _handleMassage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    const state = store.getState();

    if (!Object.prototype.hasOwnProperty.call(state, 'messages')) {
      store.setState({ messages: [] });
    }

    if (Array.isArray(data)) {
      if (!data.length) {
        store.setState({ messages: [] });
      } else if (data[0].id === 0) {
        store.setState({ messages: sortedMessages(data.map(item => convertObjKeysToCamelCase(item))) });
      } else {
        const messages = sortedMessages([...store.state.messages, ...data.map(item => convertObjKeysToCamelCase(item))]);
        store.setState({ messages });
      }
      return;
    }

    if (typeof data === 'object' && data.type === 'message') {
      const messages = sortedMessages([convertObjKeysToCamelCase(data), ...store.state.messages]);
      store.setState({ messages });
    }
  }

  private _handleClose(event: CloseEventInit) {
    this._removeEvents();

    if (this._retryCount >= 10) {
      return;
    }

    if (event.code === 1006) {
      this._reconnect();
      this._retryCount += 1;
    }
  }

  private _handleError(e: Event) {
    console.log('handleError', e);
  }

  public connect({ userId, chatId, token }: ReqWebSocketConnect) {
    this._userId = userId;
    this._chatId = chatId;
    this._token = token;

    this._ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this._addEvents();
  }

  private _reconnect() {
    this.connect({
      userId: this._userId,
      chatId: this._chatId,
      token: this._token,
    });
  }

  public getMessages(options: { offset: number }) {
    this._ws.send(
      JSON.stringify({
        content: options.offset.toString(),
        type: 'get old',
      }),
    );
  }

  public leave() {
    if (!this._ws) return;

    clearInterval(this._ping);
    this._ws.close();
    this._removeEvents();
  }

  public sendMessage(message: string) {
    this._ws.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }
}

export const messageController = new MessageController();
